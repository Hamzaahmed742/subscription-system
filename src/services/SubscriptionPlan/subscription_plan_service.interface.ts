import {
  DeleteSubscriptionPlanResponse,
  SubscriptionInputPayload,
  SubscriptionPlan,
  SubscriptionPlanFilter,
  SubscriptionPlanResponse,
  SubscriptionPlanUpdatePayload,
  UpdateSubscriptionPlanResponse,
} from './types/subscription_plan.types';

/**
 * Interface for Subscription Plan Service
 * CRUD operation
 *
 * @export
 * @interface ISubscriptionPlanService
 */
export interface ISubscriptionPlanService {
  create(payload: SubscriptionInputPayload): Promise<SubscriptionPlan>;
  findOne(where: SubscriptionPlanFilter): Promise<SubscriptionPlan>;
  findAll(
    where?: SubscriptionPlanFilter,
  ): Promise<[SubscriptionPlan[], SubscriptionPlanResponse]>;
  count(where?: SubscriptionPlanFilter): Promise<number>;
  update(
    payload: SubscriptionPlanUpdatePayload,
    where: SubscriptionPlanFilter,
  ): Promise<UpdateSubscriptionPlanResponse>;
  delete(
    where: SubscriptionPlanFilter,
  ): Promise<DeleteSubscriptionPlanResponse>;
}
