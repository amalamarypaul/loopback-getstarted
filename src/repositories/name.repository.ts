import {DefaultCrudRepository} from '@loopback/repository';
import {Name, NameRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class NameRepository extends DefaultCrudRepository<
  Name,
  typeof Name.prototype.id,
  NameRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Name, dataSource);
  }
}
