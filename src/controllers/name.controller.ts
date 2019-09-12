import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Name} from '../models';
import {NameRepository} from '../repositories';

export class NameController {
  constructor(
    @repository(NameRepository)
    public nameRepository : NameRepository,
  ) {}

  @post('/names', {
    responses: {
      '200': {
        description: 'Name model instance',
        content: {'application/json': {schema: getModelSchemaRef(Name)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Name, {exclude: ['id']}),
        },
      },
    })
    name: Omit<Name, 'id'>,
  ): Promise<Name> {
    return this.nameRepository.create(name);
  }

  @get('/names/count', {
    responses: {
      '200': {
        description: 'Name model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Name)) where?: Where<Name>,
  ): Promise<Count> {
    return this.nameRepository.count(where);
  }

  @get('/names', {
    responses: {
      '200': {
        description: 'Array of Name model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Name)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Name)) filter?: Filter<Name>,
  ): Promise<Name[]> {
    return this.nameRepository.find(filter);
  }

  @patch('/names', {
    responses: {
      '200': {
        description: 'Name PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Name, {partial: true}),
        },
      },
    })
    name: Name,
    @param.query.object('where', getWhereSchemaFor(Name)) where?: Where<Name>,
  ): Promise<Count> {
    return this.nameRepository.updateAll(name, where);
  }

  @get('/names/{id}', {
    responses: {
      '200': {
        description: 'Name model instance',
        content: {'application/json': {schema: getModelSchemaRef(Name)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Name> {
    return this.nameRepository.findById(id);
  }

  @patch('/names/{id}', {
    responses: {
      '204': {
        description: 'Name PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Name, {partial: true}),
        },
      },
    })
    name: Name,
  ): Promise<void> {
    await this.nameRepository.updateById(id, name);
  }

  @put('/names/{id}', {
    responses: {
      '204': {
        description: 'Name PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() name: Name,
  ): Promise<void> {
    await this.nameRepository.replaceById(id, name);
  }

  @del('/names/{id}', {
    responses: {
      '204': {
        description: 'Name DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.nameRepository.deleteById(id);
  }
}
