import {
  repository,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  del,
  requestBody,
} from '@loopback/rest';
import {Cars} from '../models';
import {CarsRepository} from '../repositories';

export class CarsController {
  constructor(
    @repository(CarsRepository)
    public carsRepository : CarsRepository,
  ) {}

  @post('/cars', {
    responses: {
      '200': {
        description: 'User model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Cars) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cars, {
            title: 'NewCars',
            exclude: ['id'],
          }),
        },
      },
    })
    cars: Omit<Cars, 'id'>,
  ): Promise<Cars> {
    return this.carsRepository.create(cars);
  }

  @get('/cars', {
    responses: {
      '200': {
        description: 'Array of Cars model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Cars, { includeRelations: true })
            }
          }
        }
      }
    }
  })
  async find(
  ): Promise<Cars[]> {
    return this.carsRepository.find();
  }

  @patch('/cars/{id}', {
    responses: {
      '204': {
        description: 'Cars PATCH success'
      }
    }
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cars, {partial: true}),
        },
      },
    })
    cars: Cars,
  ): Promise<void> {
    await this.carsRepository.updateById(id, cars);
  }

  @del('/cars/{id}', {
    responses: {
      '204': {
        description: 'Cars DELETE success'
      }
    }
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.carsRepository.deleteById(id);
  }
}
