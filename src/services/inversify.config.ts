/* eslint-disable @typescript-eslint/tslint/config */
import 'reflect-metadata';

import { Container, ContainerModule, interfaces } from 'inversify';
import _ from 'lodash';

import { ConfigService } from '../config/config.service';
import { DatabaseService } from './database/database.service';
import { ServiceSymbol } from './IService';
import { ServicesApp } from './services.app';
import { SubscriptionPlanService } from './SubscriptionPlan/subscription_plan.service';

const bindings = new ContainerModule((bind: interfaces.Bind) => {
  _.each(
    [ConfigService, DatabaseService, SubscriptionPlanService],
    (Service: any) => {
      bind(Service).to(Service).inSingletonScope();

      bind<any>(ServiceSymbol).toFactory<any>((context) =>
        context.container.get<any>(Service),
      );
    },
  );
  bind<ServicesApp>(ServicesApp).toSelf().inSingletonScope();
});

const container = new Container();

container.load(bindings);

export const servicesContainer = container;
