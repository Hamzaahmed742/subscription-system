import {
  IChangeResponseInfo,
  IPagination,
  IResponseInfo,
} from '../..//shared/interfaces/common.interfaces';
import { SortProperties } from '../../shared/types/sort.types';
import { ISubscriptionPlan } from '../interfaces/subscription_plan.interface';

enum SubscriptionPlanDurationEnum {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  YEAR = 'YEAR',
}
export type SubscriptionDuration = keyof typeof SubscriptionPlanDurationEnum;

export type SubscriptionPlan = ISubscriptionPlan;

// Type for creating Subscription Plan
export type SubscriptionInputPayload = Required<
  Pick<
    SubscriptionPlan,
    'name' | 'code' | 'price' | 'invoice_period' | 'invoice_duration'
  >
> &
  Pick<SubscriptionPlan, 'description' | 'trail_period' | 'trail_duration'>;

// Type of Subscription Plan Properties used for sorting
// id | price
type SubscriptionPlanSortKeys = Extract<
  keyof Pick<SubscriptionPlan, 'id' | 'price'>,
  string
>;

// Transform the property type to SortDirection
// {id: SortDirection}
type SubscriptionPlanSort = SortProperties<SubscriptionPlanSortKeys>;

// Type for getting Subscription Plan
export type SubscriptionPlanFilter = Partial<
  Pick<SubscriptionPlan, 'id' | 'code' | 'slug'>
> &
  Pick<IPagination, 'limit' | 'skip'> & { sort_by: SubscriptionPlanSort };

// Type for Updating Subscription Plan
export type SubscriptionPlanUpdatePayload = SubscriptionInputPayload;

export type SubscriptionPlanResponse = IResponseInfo<SubscriptionPlan>;
export type DeleteSubscriptionPlanResponse = IChangeResponseInfo<
  SubscriptionPlan
>;
export type UpdateSubscriptionPlanResponse = IChangeResponseInfo<
  SubscriptionPlan
>;
