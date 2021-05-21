import {repository} from '@loopback/repository';
import {
  post,
  get,
  getModelSchemaRef,
  requestBody,
  param,
  del,
} from '@loopback/rest';
import {Comment} from '../models';
import {CommentRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

export class CommentController {
  constructor(
    @repository(CommentRepository)
    public commentRepository: CommentRepository,
  ) {}

  @post('/comment', {
    responses: {
      '200': {
        description: 'Comment model instance',
        content: {'application/json': {schema: getModelSchemaRef(Comment)}},
      },
    },
  })
  @authenticate('jwt')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comment, {
            title: 'NewComment',
            exclude: ['id'],
          }),
        },
      },
    })
    comment: Omit<Comment, 'id'>,
  ): Promise<Comment> {
    return this.commentRepository.create(comment);
  }

  @get('/comment', {
    responses: {
      '200': {
        description: 'Array of Comment model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Comment, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async find(): Promise<Comment[]> {
    return this.commentRepository.find();
  }

  @del('/comment/{id}', {
    responses: {
      '204': {
        description: 'Cars DELETE success',
      },
    },
  })
  @authenticate('jwt')
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.commentRepository.deleteById(id);
  }
}
