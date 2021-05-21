import {Entity, model, property, StringType} from '@loopback/repository';

@model()
export class Users extends Entity {
  @property({
    type: 'string',
    id: true,
    mongodb: {dataType: 'ObjectId'},
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  login: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  // describe navigational properties here
}

export interface UserCedentiale {
  email: string;
  password: string;
}

export interface UserPublic {
  name: string;
  email: string;
}

export type UsersWithRelations = Users & UsersRelations;
