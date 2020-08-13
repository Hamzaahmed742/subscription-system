import { inject, injectable } from 'inversify';

import { createEverLogger } from '../helpers/Log';
import { DatabaseService } from './database/database.service';

@injectable()
export class ServicesApp {
  private log = createEverLogger({ name: 'main' });
  constructor(
    @inject(DatabaseService)
    private readonly dbservice: DatabaseService,
  ) {}
  async start(): Promise<void> {
    // TODO: Uncomment  in dev or production mode
    // await this.dbservice.connectDB();
  }
}
