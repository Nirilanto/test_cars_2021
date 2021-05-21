import {repository} from '@loopback/repository';
import {
  post,
  Response,
  get,
  getModelSchemaRef,
  requestBody,
  RestBindings,
  HttpErrors,
} from '@loopback/rest';
import {TokenService, authenticate} from '@loopback/authentication';
import {UserProfile, securityId, SecurityBindings} from '@loopback/security';
import {inject} from '@loopback/core';
import * as isemail from 'isemail';

import {UserService} from '../services/user-service';
import {
  TokenServiceBindings,
  PasswordHasherBindings,
  TokenServiceConstants,
  UserServiceBindings,
} from '../keys';
import {PasswordHasher} from '../services/hash.password.bcryptjs';
import {Users, UserCedentiale} from '../models';
import {UsersRepository} from '../repositories';

const setTokenCookie = (response: Response, token?: String): void => {
  // It's secured as long as CORS is disabled and the API only accepts JSON
  // https://github.com/pillarjs/understanding-csrf
  response.setHeader('set-cookie', [
    `token=${
      token
        ? `${token}; path=/; max-age=${Number(
            TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE,
          )} ; HttpOnly`
        : ` ; path=/; max-age=0 ; HttpOnly` // reset
    }`,
  ]);
};

export class UsersController {
  constructor(
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
  ) {}

  @post('/users', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Users)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {
            title: 'NewUsers',
            exclude: ['id'],
          }),
        },
      },
    })
    users: Omit<Users, 'id'>,
  ): Promise<Users> {
    this.userService.validateCredentials(`${users.email}`, users.password);

    if (users.email && !isemail.validate(users.email)) {
      throw new HttpErrors.BadRequest('Invalid email.');
    }

    let uniqueness = await this.usersRepository.count({
      email: users.email,
    });
    if (uniqueness.count > 0) {
      // TODO handle uniqueness at the database level?
      throw new HttpErrors.Unauthorized(
        `User with email ${users.email} already exists.`,
      );
    }
    const password = await this.passwordHasher.hashPassword(users.password);
    try {
      const savedUser = await this.usersRepository.create(
        new Users({...users, password}),
      );

      return Object.assign({...savedUser, password: 'crypted'});
      // TO DO perhaps we should allow user creation on first
      // return this.userRepository.create(user)
    } catch (error) {
      throw error;
    }
  }

  @get('/users', {
    responses: {
      '200': {
        description: 'Array of Users model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Users, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  @post('/users/login', {
    responses: {
      '204': {
        description: 'User login success',
      },
    },
  })
  async login(
    @requestBody() {email, password}: UserCedentiale,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<any> {
    const user = await this.userService.verifyCredentials(email, password);
    const userProfile = this.userService.convertToUserProfile(user);
    const token = await this.jwtService.generateToken(userProfile);
    setTokenCookie(response, token);
    return token;
  }

  @get('/users/me', {
    responses: {
      '200': {
        description: 'The current user profile',
        content: {'application/json': {schema: getModelSchemaRef(Users)}},
      },
    },
  })
  @authenticate('jwt')
  async printCurrentUser(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<Users> {
    const userId = String(currentUserProfile[securityId]);
    const foundUser = await this.usersRepository.findById(userId);
    return foundUser;
  }

  @post('/users/logout', {
    responses: {
      '204': {
        description: 'User login success',
      },
    },
  })
  async logout(
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<any> {
    setTokenCookie(response);
  }
}
