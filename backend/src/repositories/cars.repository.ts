import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Cars, CarsRelations} from '../models';

export class CarsRepository extends DefaultCrudRepository<
  Cars,
  typeof Cars.prototype.id,
  CarsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Cars, dataSource);
  }
}
