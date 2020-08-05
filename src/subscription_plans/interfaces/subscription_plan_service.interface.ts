import {
  DeleteSubscriptionPlanResponse,
  SubscriptionInputPayload,
  SubscriptionPlan,
  SubscriptionPlanFilter,
  SubscriptionPlanResponse,
  UpdateSubscriptionPlanResponse,
} from '../types/subscription_plan.types';

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
  findAll(where?: SubscriptionPlanFilter): SubscriptionPlan[];
  findAllWithPagination(
    where?: SubscriptionPlanFilter,
  ): SubscriptionPlanResponse;
  count(where?: SubscriptionPlanFilter): number;
  update(
    payload: SubscriptionInputPayload,
    where: SubscriptionPlanFilter,
  ): UpdateSubscriptionPlanResponse;
  delete(
    payload: SubscriptionInputPayload,
    where: SubscriptionPlanFilter,
  ): DeleteSubscriptionPlanResponse;
}
