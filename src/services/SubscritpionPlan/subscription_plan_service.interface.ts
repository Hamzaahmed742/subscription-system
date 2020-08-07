import {
  DeleteSubscriptionPlanResponse,
  SubscriptionInputPayload,
  SubscriptionPlan,
  SubscriptionPlanFilter,
  SubscriptionPlanResponse,
  SubscriptionPlanUpdatePayload,
  UpdateSubscriptionPlanResponse,
} from '../../subscription_plans/types/subscription_plan.types';

/**
 * Interface for Subscription Plan Service
 * CRUD operation
 *
 * @export
 * @interface ISubscriptionPlanService
 */
export interface ISubscriptionPlanService {
  create(payload: SubscriptionInputPayload): SubscriptionPlan;
  findOne(where: SubscriptionPlanFilter): SubscriptionPlan;
  findAll(
    where?: SubscriptionPlanFilter,
  ): [SubscriptionPlan[], SubscriptionPlanResponse];
  count(where?: SubscriptionPlanFilter): number;
  update(
    payload: SubscriptionPlanUpdatePayload,
    where: SubscriptionPlanFilter,
  ): UpdateSubscriptionPlanResponse;
  delete(where: SubscriptionPlanFilter): DeleteSubscriptionPlanResponse;
}
