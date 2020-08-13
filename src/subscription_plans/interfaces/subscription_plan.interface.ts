import { SubscriptionDuration } from '../types/subscription_plan.types';

/**
 * Subscription Plan Model
 * Manage Subscription plans for your service
 * Define its duration for both invoice and trail period
 *
 * @export
 * @interface ISubscriptionPlan
 */
export interface ISubscriptionPlan {
  id: number;

  /**
   * Store the Subscription Name
   *
   * @type {string}
   * @memberof ISubscriptionPlan
   */
  name: string;
  /**
   * Random Unique code generated for the subscription plan
   *
   * @type {string}
   * @memberof ISubscriptionPlan
   */
  code?: string;

  /**
   * Alias of the Subscription Name with lowercase
   *
   * @type {string}
   * @memberof ISubscriptionPlan
   */
  slug?: string;

  /**
   * Description of the subscription plan
   *
   * @type {string}
   * @memberof ISubscriptionPlan
   */
  description?: string;

  /**
   * One time cost of the subscription plan
   *
   * @type {number}
   * @memberof ISubscriptionPlan
   */
  price: number;

  /**
   * Extra fee for the subscription plan like
   * signup_fee or credit_card fee
   *
   * @type {number}
   * @memberof ISubscriptionPlan
   */
  extra_fee?: number;
  create_at?: Date;
  /**
   * Subscription period must be between 1 and 30
   *
   * @type {number}
   * @memberof ISubscriptionPlan
   */
  invoice_period?: number;

  /**
   * Duration must be DAY | WEEK | MONTH | YEAR
   *
   * @type {SubscriptionDuration}
   * @memberof ISubscriptionPlan
   */
  invoice_duration?: SubscriptionDuration;

  /**
   * To offer trail period for the subscription
   * Trail period must be between 1 and 30
   *
   * @type {number}
   * @memberof ISubscriptionPlan
   */
  trail_period?: number;
  /**
   * Duration must be DAY | WEEK | MONTH | YEAR
   *
   * @type {SubscriptionDuration}
   * @memberof ISubscriptionPlan
   */
  trail_duration?: SubscriptionDuration;
}
