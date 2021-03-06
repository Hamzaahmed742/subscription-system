import {
  INestApplicationContext,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { useContainer } from 'class-validator';
import cors from 'cors';
import FastifyCompress from 'fastify-compress';
import FastifyHelmet from 'fastify-helmet';
import { FlubErrorHandler } from 'nestjs-flub';
import { join } from 'path';

import { AppModule } from './app.module';
import { env } from './env';
import { servicesContainer } from './services/inversify.config';
import { ServicesApp } from './services/services.app';

/**
 * Start and Stop the Application
 * @export
 * @class AppDispatcher
 */
export class AppDispatcher {
  private app: any;
  private logger = new Logger(AppDispatcher.name);
  /**
   * Trigger the server
   * @returns {Promise<void>}
   * @memberof AppDispatcher
   */
  async dispatch(): Promise<void> {
    await this.createServer();
    return this.startServer();
  }

  /**
   * Stop the Server
   * @returns {Promise<void>}
   * @memberof AppDispatcher
   */
  async shutdown(): Promise<void> {
    await this.app.close();
  }

  /**
   * `AppModule` Context
   * @returns {Promise<INestApplicationContext>}
   * @memberof AppDispatcher
   */
  // eslint-disable-next-line @typescript-eslint/tslint/config
  public getContext(): Promise<INestApplicationContext> {
    return NestFactory.createApplicationContext(AppModule);
  }

  /**
   * Initialize the server
   * @private
   * @returns {Promise<void>}
   * @memberof AppDispatcher
   */
  private async createServer(): Promise<void> {
    const db = servicesContainer.get<ServicesApp>(ServicesApp);

    await db.start();
    this.app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({ logger: false }),
    );
    useContainer(this.app.select(AppModule), { fallbackOnErrors: true });
    this.app.register(FastifyHelmet);
    this.app.use(cors());
    this.app.register(FastifyCompress, { global: false });

    if (env.NODE_ENV !== 'production') {
      this.app.useGlobalFilters(
        new FlubErrorHandler({ theme: 'dark', quote: true }),
      );
    }
    this.app.useGlobalPipes(new ValidationPipe());
    const protoDir = join(process.cwd(), 'protos');
    // # TODO: Implement secure connection
    // const credentials = grpc.ServerCredentials.createSsl(null, [
    //   {
    //     private_key: readFileSync(join(process.cwd(), 'certs/server.key')),
    //     cert_chain: readFileSync(join(process.cwd(), 'certs/server.crt')),
    //   },
    // ] as any);

    this.app.connectMicroservice({
      transport: Transport.GRPC,
      options: {
        // credentials,
        url: '0.0.0.0:5000',
        package: 'rpc',
        protoPath: `${protoDir}/rpc/rpc.proto`,
        loader: {
          keepCase: true,
          longs: Number,
          defaults: true,
          oneofs: true,
          enums: String,
          arrays: true,
          objects: true,
          includeDirs: [protoDir],
        },
      },
    });

    await this.app.startAllMicroservicesAsync();
  }

  /**
   * Start the server
   * @private
   * @returns {Promise<void>}
   * @memberof AppDispatcher
   */
  private async startServer(): Promise<void> {
    const host = env.GQLHOST;
    const port = env.GQLPORT;
    await this.app.listen(port, host);
    this.logger.log(
      `😎 Graphql is exposed at http://${host}:${port}/graphql 😎`,
    );
    this.logger.log(`😎 Server is listening http://${host}:${port} 😎`);
  }
}
