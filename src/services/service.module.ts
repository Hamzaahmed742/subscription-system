import { Global, Module } from '@nestjs/common';

import { servicesContainer } from './inversify.config';
import { ServiceSymbol } from './IService';

const getServices = () =>
  servicesContainer.getAll(ServiceSymbol).map((service) => ({
    provide: service.constructor,
    useValue: service,
  }));

const services = getServices();

@Global()
@Module({
  providers: services,
  exports: services,
})
export class ServicesModule {
  constructor() {
    // Empty
  }
}
