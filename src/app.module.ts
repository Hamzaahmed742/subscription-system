import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';
import _ from 'lodash';
import { LoggerModule } from 'nestjs-pino';

import { config as appConfig } from './config/app.config';
import { HttpExceptionFilter } from './shared/exception-filter/http-exception.filter';
import { TimeoutInterceptor } from './shared/interceptor/timeout.interceptor';
import schemaDirectives from './shared/schema-directive/index';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: [
        {
          level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
          nestedKey: 'subscriptionService',
          redact: {
            paths: ['req', 'res', 'hostname', 'pid'],
            remove: true,
          },
        },
      ],
      exclude: ['graphql'],
    } as any),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),

    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        schemaDirectives,
        include: [],
        typePaths: ['./**/**/*.graphql'],
        installSubscriptionHandlers: true,
        context: ({ req }) => ({ req }),
        introspection: true,
        debug: configService.get<string>('app.nodeEnv') === 'development',
        engine: {
          schemaTag: configService.get<string>('app.nodeEnv'),
          apiKey: configService.get<string>('app.apolloEngineApiKey'),
        },
        resolverValidationOptions: {
          requireResolversForResolveType: false,
        },
        resolvers: {
          JSON: GraphQLJSON,
          JSONObject: GraphQLJSONObject,
        },
        formatError: (error) => {
          try {
            error.message = JSON.parse(error.message);
          } catch (e) {
            // Empty
          }
          return {
            ...error,
            message: error.message,
            code: _.get(error, 'extensions.exception.title', 'UNKNOWN'),
            locations: error.locations,
            path: error.path,
          };
        },
        formatResponse: (response) => response,
      }),
      inject: [ConfigService],
    }),
  ],

  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
