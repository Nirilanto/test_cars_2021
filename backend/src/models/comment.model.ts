import {Entity,hasOne, model, property} from '@loopback/repository';

import {Users} from './users.model';
import {Cars} from './cars.model';

@model({settings: {strict: false}})
export class Comment extends Entity {
  @property({
    type: 'date',
    default: () => new Date()
  })
  date?: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  body: string;

  @hasOne(() => Users)
  userId: string;

  @hasOne(() => Cars)
  carsId: string; 

  [prop: string]: any;

  constructor(data?: Partial<Comment>) {
    super(data);
  }
}

export interface CommentRelations {
  // describe navigational properties here
}

export type CommentWithRelations = Comment & CommentRelations;
