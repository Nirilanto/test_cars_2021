import { bind, BindingScope } from '@loopback/core'
import { repository } from '@loopback/repository'
import { HttpErrors } from '@loopback/rest'
import { inject, Getter } from '@loopback/context'
import { SecurityBindings, UserProfile } from '@loopback/security'
import { CarsRepository } from '../repositories'

@bind({ scope: BindingScope.TRANSIENT })
export class AuthorizationService {
  constructor(
    @repository(CarsRepository) public carsRepository: CarsRepository,
    @inject.getter(SecurityBindings.USER, { optional: true })
    public getCurrentUser: Getter<UserProfile>
  ) {}

  async authorize(
    type: string,
    id: string,
    action: 'read' | 'create' | 'update' | 'delete' = 'read'
  ): Promise<void> {
    if (!['Article', 'Post', 'App'].includes(type)) {
      throw new HttpErrors.Unauthorized('unauthorized')
    }

    if (type === 'App' && action === 'read') {
      return
    }

    const currentUser = await this.getCurrentUser()
    if (action !== 'read' && !currentUser) {
      throw new HttpErrors.Unauthorized('unauthorized')
    } else if (action !== 'read' && type === 'App' && !currentUser) {
      throw new HttpErrors.Unauthorized('unauthorized')
    }

    const repository = this.repositoryFromType(type)
    const foundEntity = await repository.findById(id)

    if (!foundEntity) {
      throw new HttpErrors.NotFound(`${type} with id: ${id} not found.`)
    }
  }

  repositoryFromType(type: string): CarsRepository{
    return  this.carsRepository
  }
}
