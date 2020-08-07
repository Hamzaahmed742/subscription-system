/* eslint-disable @typescript-eslint/no-unused-vars */
import { injectable } from 'inversify';
import _ from 'lodash';

import { createEverLogger } from '../../helpers/Log';
import { BadRequestError, ParseError } from '../../shared/errors.messages';
import { SubscriptionPlanErrorMessage } from '../../subscription_plans/message/error.message';
import { SubscriptionPlans } from '../../subscription_plans/model/subscription_plan.model';
import {
  DeleteSubscriptionPlanResponse,
  SubscriptionInputPayload,
  SubscriptionPlan,
  SubscriptionPlanFilter,
  SubscriptionPlanResponse,
  UpdateSubscriptionPlanResponse,
} from '../../subscription_plans/types/subscription_plan.types';
import { DatabaseService } from '../database/database.service';
import { servicesContainer } from '../inversify.config';
import { ISubscriptionPlanService } from './subscription_plan_service.interface';

@injectable()
export class SubscriptionPlanService implements ISubscriptionPlanService {
  private logger = createEverLogger({ name: 'SubscriptionPlanService' });
  private dbService = servicesContainer
    .get<DatabaseService>(DatabaseService)
    .connectDB();
  async create(payload: SubscriptionInputPayload): Promise<SubscriptionPlan> {
    let result;
    try {
      const dbInstace = await this.dbService;
      result = new SubscriptionPlans({ ...payload });
      await dbInstace.store(result);
      await dbInstace.saveChanges();
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
