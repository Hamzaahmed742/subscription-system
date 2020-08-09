import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';
import _ from 'lodash';

import { ConfigModule } from './config/config.module';
// import { servicesContainer } from './services/inversify.config';
import { ServicesModule } from './services/service.module';
// import { SubscriptionPlanService } from './services/SubscriptionPlan/subscription_plan.service';
import { HttpExceptionFilter } from './shared/exception-filter/http-exception.filter';
import { TimeoutInterceptor } from './shared/interceptor/timeout.interceptor';
import schemaDirectives from './shared/schema-directive/index';
import { SubscriptionPlanModule } from './subscription_plans/subscription_plan.module';

@Module({
  imports: [
    ConfigModule,
    ServicesModule,
    SubscriptionPlanModule,
    GraphQLModule.forRootAsync({
      useFactory: () => ({
        schemaDirectives,
        include: [],
        typePaths: ['./**/**/*.graphql'],
        installSubscriptionHandlers: true,
        context: ({ req }) => ({ req }),
        introspection: true,
        // debug: configService.get<string>('app.nodeEnv') === 'development',
        // engine: {
        //   schemaTag: configService.get<string>('app.nodeEnv'),
        //   apiKey: configService.get<string>('app.apolloEngineApiKey'),
        // },
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
export class AppModule {
  constructor() {
    // Debug the Insert operation
    // const s = servicesContainer.get<SubscriptionPlanService>(
    //   SubscriptionPlanService,
    // );
    // void s.create({
    //   name: 'Test',
    //   invoice_duration: 'DAY',
    //   invoice_period: 30,
    //   price: 10,
    //   code: '12312',
    //   description: 'test',
    //   trail_duration: 'DAY',
    //   trail_period: 12,
    // });
    // void s.findAll();
    // void s.delete({ id: '257-A' });
    // void s.findOne({ id: '257-A' });
    // void s.update({ name: 'Test Update name1' }, { id: '353-A' });
  }
}
