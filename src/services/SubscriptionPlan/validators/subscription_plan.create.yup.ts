import _ from 'lodash';
import * as yup from 'yup';

import { ErrorGenerator } from '../../../shared/errors.generator';
import { SubscriptionPlanErrorMessage } from '../message/error.message';
import {
  SubscriptionDuration,
  SubscriptionInputPayload,
  SubscriptionPlanDurationEnum,
} from '../types/subscription_plan.types';

/**
 * Validator for Creating the Subscription Plan
 */
export const subscriptionPlanCreateSchema = yup
  .object<SubscriptionInputPayload>({
    name: yup
      .string()
      .trim()
      .min(3, ErrorGenerator.MiniLength<SubscriptionInputPayload>('name', 3))
      .max(50, ErrorGenerator.MaxLength<SubscriptionInputPayload>('name', 50))
      .required(ErrorGenerator.Required<SubscriptionInputPayload>('name')),
    price: yup
      .number()
      .min(0)
      .required(ErrorGenerator.Required<SubscriptionInputPayload>('price')),
    invoice_period: yup
      .number()
      .min(
        1,
        ErrorGenerator.MinValue<SubscriptionInputPayload>('invoice_period', 1),
      )
      .max(
        31,
        ErrorGenerator.MaxValue<SubscriptionInputPayload>('invoice_period', 31),
      )
      .required(
        ErrorGenerator.Required<SubscriptionInputPayload>('invoice_period'),
      ),
    invoice_duration: yup
      .mixed<SubscriptionDuration>()
      .oneOf(Object.values(SubscriptionPlanDurationEnum))
      .required(
        ErrorGenerator.Required<SubscriptionInputPayload>('invoice_duration'),
      ),
    trail_period: yup
      .number()
      .min(
        1,
        ErrorGenerator.MiniLength<SubscriptionInputPayload>('trail_period', 1),
      )
      .max(31),
    trail_duration: yup
      .mixed<SubscriptionDuration>()
      .oneOf(Object.values(SubscriptionPlanDurationEnum)),
  })
  .test(
    'invoice-period-duration',
    SubscriptionPlanErrorMessage.INVOICE_PERIOD_DURATION,
    // eslint-disable-next-line complexity
    (value: SubscriptionInputPayload) => {
      /**
       * Validate the duration and period for the subscription plan
       * If Duration is DAY then period must be between 1 and 31
       * If Duration is MONTH then period must be between 1 and 12
       * If Duration is YEAR then period must be between 1 and 5
       * If Duration is WEEK then period must be between 1 and 4
       */
      if (!_.isNil(value.invoice_period) && !_.isNil(value.invoice_duration)) {
        if (
          value.invoice_duration === SubscriptionPlanDurationEnum.DAY &&
          value.invoice_period <= 31
        ) {
          return true;
        }
        if (
          value.invoice_duration === SubscriptionPlanDurationEnum.MONTH &&
          value.invoice_period <= 12
        ) {
          return true;
        }
        if (
          value.invoice_duration === SubscriptionPlanDurationEnum.YEAR &&
          value.invoice_period <= 5
        ) {
          return true;
        }
        if (
          value.invoice_duration === SubscriptionPlanDurationEnum.WEEK &&
          value.invoice_period <= 4
        ) {
          return true;
        }
        return false;
      }
      return false;
    },
  )
  .test(
    'trail-period-duration',
    SubscriptionPlanErrorMessage.TRAIL_PERIOD_DURATION,
    // eslint-disable-next-line complexity
    (value: SubscriptionInputPayload) => {
      /**
       * Validate the duration and period for the subscription plan
       * If Duration is DAY then period must be between 1 and 31
       * If Duration is MONTH then period must be between 1 and 12
       * If Duration is YEAR then period must be between 1 and 5
       * If Duration is WEEK then period must be between 1 and 4
       */
      if (!_.isNil(value.trail_period) && !_.isNil(value.trail_duration)) {
        if (
          value.trail_duration === SubscriptionPlanDurationEnum.DAY &&
          value.trail_period <= 31
        ) {
          return true;
        }
        if (
          value.trail_duration === SubscriptionPlanDurationEnum.MONTH &&
          value.trail_period <= 12
        ) {
          return true;
        }
        if (
          value.trail_duration === SubscriptionPlanDurationEnum.YEAR &&
          value.trail_period <= 5
        ) {
          return true;
        }
        if (
          value.trail_duration === SubscriptionPlanDurationEnum.WEEK &&
          value.trail_period <= 4
        ) {
          return true;
        }
        return false;
      }
      return true;
    },
  );
