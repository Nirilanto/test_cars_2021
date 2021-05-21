import { BootMixin } from '@loopback/boot'
import { ApplicationConfig, createBindingFromClass } from '@loopback/core'
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer'
import { RepositoryMixin } from '@loopback/repository'
import { RestApplication } from '@loopback/rest'
import { ServiceMixin } from '@loopback/service-proxy'
import {
  AuthenticationComponent,
  AuthenticationBindings
} from '@loopback/authentication'
import path from 'path'
import * as dotenv from 'dotenv'
import { MySequence } from './sequence'
import { JWTAuthenticationStrategy } from './authentication-strategies/jwt.strategy'
import { AuthenticateActionProvider } from './providers/custom.authentication.provider'
import {
  PasswordHasherBindings,
  TokenServiceBindings,
  TokenServiceConstants,
  UserServiceBindings,
  AuthorizationBindings
} from './keys'
import { BcryptHasher } from './services/hash.password.bcryptjs'
import { JWTService } from './services/jwt-service'
import { UserService } from './services/user-service'
import {  AuthorizationService } from './services'

export class ServerApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication))
) {
  constructor(options: ApplicationConfig = {}) {
    super(options)

    dotenv.config({ path: '.env' })

    this.setUpBindings()

    // Set up the custom sequence
    this.sequence(MySequence)

    // Bind authentication component related elements
    this.component(AuthenticationComponent)
    this.bind(AuthenticationBindings.AUTH_ACTION).toProvider(
      AuthenticateActionProvider
    )
    this.add(createBindingFromClass(JWTAuthenticationStrategy))

    // Customize @loopback/rest-explorer configuration here
    if (process.env.NODE_ENV === 'production') {
      this.configure(RestExplorerBindings.COMPONENT).to({
        path: '/openapi/ui'
      })
      this.component(RestExplorerComponent)
    } else {
      // Set up default home page
      this.static('/', path.join(__dirname, '../public'))

      this.configure(RestExplorerBindings.COMPONENT).to({
        path: '/explorer'
      })
    }

    this.component(RestExplorerComponent)

    this.projectRoot = __dirname
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true
      }
    }
  }

  setUpBindings(): void {
    this.bind(TokenServiceBindings.TOKEN_SECRET).to(
      TokenServiceConstants.TOKEN_SECRET_VALUE
    )

    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(
      TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE
    )

    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService)

    this.bind(PasswordHasherBindings.ROUNDS).to(10)
    this.bind(PasswordHasherBindings.PASSWORD_HASHER).toClass(BcryptHasher)

    this.bind(UserServiceBindings.USER_SERVICE).toClass(UserService)
    this.bind(AuthorizationBindings.AUTHORIZATION_SERVICE).toClass(
      AuthorizationService
    )
  }
}
