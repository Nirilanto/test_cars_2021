import { repository, Where } from '@loopback/repository'
import { UserProfile, securityId, SecurityBindings } from '@loopback/security'
import { inject, Getter } from '@loopback/context'
import { HttpErrors } from '@loopback/rest'

import { PasswordHasherBindings } from '../keys'
import { UsersRepository } from '../repositories'
import { PasswordHasher } from './hash.password.bcryptjs'
import { Users } from '../models'


export class UserService {
  constructor(
    @repository(UsersRepository) public userRepository: UsersRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @inject.getter(SecurityBindings.USER, { optional: true })
    public getCurrentUser: Getter<UserProfile>
  ) {}

  validateCredentials(login: string, password: string) {
    if (!login || !password) {
      throw new HttpErrors.UnprocessableEntity(
        'email and password are required.'
      )
    }
  }

  async verifyCredentials(login: string, password: string): Promise<Users> {
    this.validateCredentials(login, password)

    const foundUser = await this.userRepository.findOne({
      where: { or: [{ login }, { email: login }] }
    })

    if (!foundUser) {
      throw new HttpErrors.NotFound(`User ${login} not found.`)
    }
    const passwordMatched = await this.passwordHasher.comparePassword(
      password,
      foundUser.password
    )

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized('The credentials are not correct.')
    }

    return foundUser
  }

  convertToUserProfile(user: Users): UserProfile {
    return Object.assign(
      { [securityId]: '', name: '' },
      {
        [securityId]: user.id,
        name: user.login,
        id: user.id,
        email: user.email
      }
    )
  }
}
