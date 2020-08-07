import { ISubscriptionPlan } from '../interfaces/subscription_plan.interface';
import { SubscriptionInputPayload } from '../types/subscription_plan.types';

/**
 * Subscription Plans Model
 * @CollectionName will be SubscriptionPlan
 *
 * @export
 * @class SubscriptionPlanModel
 * @implements {ISubscriptionPlan}
 */
export class SubscriptionPlans implements Partial<ISubscriptionPlan> {
  constructor(payload?: SubscriptionInputPayload) {
    Object.assign(this, payload);
  }
}
