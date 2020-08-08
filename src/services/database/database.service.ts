/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/unbound-method */

import fs from 'fs';
import { injectable } from 'inversify';
import { join } from 'path';
import { DocumentStore, IDocumentSession } from 'ravendb';

import { env } from '../../env';
import { createEverLogger } from '../../helpers/Log';
import { IService } from '../IService';
import { IDatabaseRepo } from './database_service.base';

/**
 * Implementation Service for Crud
 * Database Implemented: RavenDB
 * You can implement any underlying database in this  REPO
 * @export
 * @class DatabaseService
 * @implements {IService}
 * @implements {IDatabaseRepo}
 */
@injectable()
export class DatabaseService implements IService, IDatabaseRepo {
  protected db: IDocumentSession;
  private log = createEverLogger({ name: 'main' });
  constructor() {
    process.on('SIGINT', this.gracefulExit).on('SIGTERM', this.gracefulExit);
    // void this.connectDB();
  }
  async create<T, P>(payload: P): Promise<T> {
    await this.connectDB();
    await this.db.store(payload as any);
    await this.db.saveChanges();
    return (payload as unknown) as T;
  }
  findOne<T, F>(where: F): Promise<T> {
    throw new Error('Method not implemented.');
  }
  findAll<T, F>(where?: F): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  count<F>(where?: F): Promise<number> {
    throw new Error('Method not implemented.');
  }
  update<F, U, T>(payload: U, where: F): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  delete<T, F>(where: F): Promise<T> {
    throw new Error('Method not implemented.');
  }
  async connectDB(): Promise<IDocumentSession> {
    try {
      if (this.db) {
        this.log.info('Return Existing Session');
        return (this.db as unknown) as any;
      }
      this.log.info('Trying to connect to database');
      const authOptions = {
        certificate: fs.readFileSync(join(process.cwd(), env.DB_CERTS)),
        type: 'pfx',
      };
      const store = new DocumentStore(
        env.DB_URI,
        env.DB_NAME,
        authOptions as any,
      );
      store.conventions.findCollectionNameForObjectLiteral = (entity: any) =>
        entity?.collection;
      store.initialize();
      this.db = store.openSession();
      return (this.db as unknown) as any;
    } catch (err) {
      this.log.error(err, 'Sever initialization failed! Cannot connect to DB');
    }
  }
  private gracefulExit() {
    try {
      if (this.db != null) {
        this.db = null;
        this.log.info('Closing the DB connection');
        process.exit(0);
      }
    } catch (err) {
      process.exit(0);
    }
  }
}
