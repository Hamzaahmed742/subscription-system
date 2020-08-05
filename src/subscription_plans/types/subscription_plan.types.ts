import { ISubscriptionPlan } from '../interfaces/subscription_plan.interface';

export enum SubscriptionPlanDurationEnum {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  YEAR = 'YEAR',
}
export type SubscriptionDuration = keyof typeof SubscriptionPlanDurationEnum;
export type SubscriptionPlan = ISubscriptionPlan;
export type SubscriptionInputPayload = Required<
  Pick<
    SubscriptionPlan,
    'name' | 'code' | 'price' | 'invoice_period' | 'invoice_duration'
  >
> &
  Pick<SubscriptionPlan, 'description' | 'trail_period' | 'trail_duration'>;
