import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class Name extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
  })
  age?: number;

  @property({
    type: 'boolean',
    default: true,
  })
  isActive?: boolean;


  constructor(data?: Partial<Name>) {
    super(data);
  }
}

export interface NameRelations {
  // describe navigational properties here
}

export type NameWithRelations = Name & NameRelations;
