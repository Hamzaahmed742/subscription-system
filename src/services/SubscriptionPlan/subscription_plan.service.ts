/* eslint-disable @typescript-eslint/no-unused-vars */
import { injectable } from 'inversify';
import _ from 'lodash';

import { createEverLogger } from '../../helpers/Log';
import { BadRequestError, ParseError } from '../../shared/errors.messages';
import { DatabaseService } from '../database/database.service';
import { servicesContainer } from '../inversify.config';
import IService from '../IService';
import { SubscriptionPlanErrorMessage } from './message/error.message';
import { SubscriptionPlans } from './model/subscription_plan.model';
import { ISubscriptionPlanService } from './subscription_plan_service.interface';
import {
  DeleteSubscriptionPlanResponse,
  SubscriptionInputPayload,
  SubscriptionPlan,
  SubscriptionPlanFilter,
  SubscriptionPlanResponse,
  UpdateSubscriptionPlanResponse,
} from './types/subscription_plan.types';

@injectable()
export class SubscriptionPlanService
  implements ISubscriptionPlanService, IService {
  private logger = createEverLogger({ name: 'SubscriptionPlanService' });
  private dbService = servicesContainer.get<DatabaseService>(DatabaseService);
  async create(payload: SubscriptionInputPayload): Promise<SubscriptionPlan> {
    let result;
    try {
      const dbInstance = await this.dbService.connectDB();
      result = new SubscriptionPlans({ ...payload });
      await dbInstance.store(result);
      await dbInstance.saveChanges();
      this.logger.debug('Subscription Plan added Successfully', result);
    } catch (e) {
      this.logger.error(e);
      ParseError(e, SubscriptionPlanErrorMessage.DUPLICATE);
    }
    if (!_.isEmpty(result.id)) {
      return result;
    }
    throw BadRequestError(SubscriptionPlanErrorMessage.UNABLE_TO_SAVE);
  }
  findOne(where: SubscriptionPlanFilter): Promise<SubscriptionPlan> {
    throw new Error('Method not implemented.');
  }
  findAll(
    where?: SubscriptionPlanFilter,
  ): Promise<[SubscriptionPlan[], SubscriptionPlanResponse]> {
    throw new Error('Method not implemented.');
  }
  count(where?: SubscriptionPlanFilter): Promise<number> {
    throw new Error('Method not implemented.');
  }
  update(
    payload: SubscriptionInputPayload,
    where: SubscriptionPlanFilter,
  ): Promise<UpdateSubscriptionPlanResponse> {
    throw new Error('Method not implemented.');
  }
  delete(
    where: SubscriptionPlanFilter,
  ): Promise<DeleteSubscriptionPlanResponse> {
    throw new Error('Method not implemented.');
  }
}
