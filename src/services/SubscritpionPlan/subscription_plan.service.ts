/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DeleteSubscriptionPlanResponse,
  SubscriptionInputPayload,
  SubscriptionPlan,
  SubscriptionPlanFilter,
  SubscriptionPlanResponse,
  UpdateSubscriptionPlanResponse,
} from '../../subscription_plans/types/subscription_plan.types';
import { ISubscriptionPlanService } from './subscription_plan_service.interface';

export class SubscriptionPlanService implements ISubscriptionPlanService {
  create(payload: SubscriptionInputPayload): SubscriptionPlan {
    throw new Error('Method not implemented.');
  }
  findOne(where: SubscriptionPlanFilter): SubscriptionPlan {
    throw new Error('Method not implemented.');
  }
  findAll(
    where?: SubscriptionPlanFilter,
  ): [SubscriptionPlan[], SubscriptionPlanResponse] {
    throw new Error('Method not implemented.');
  }
  count(where?: SubscriptionPlanFilter): number {
    throw new Error('Method not implemented.');
  }
  update(
    payload: SubscriptionInputPayload,
    where: SubscriptionPlanFilter,
  ): UpdateSubscriptionPlanResponse {
    throw new Error('Method not implemented.');
  }
  delete(where: SubscriptionPlanFilter): DeleteSubscriptionPlanResponse {
    throw new Error('Method not implemented.');
  }
}
