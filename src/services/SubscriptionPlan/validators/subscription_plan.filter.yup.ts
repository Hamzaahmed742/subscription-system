import * as yup from 'yup';

import { ErrorGenerator } from '../../../shared/errors.generator';
import {
  SubscriptionPlanFilter,
  SubscriptionPlanSort,
} from '../types/subscription_plan.types';

export const subscriptionPlanFilterSchema = yup.object<SubscriptionPlanFilter>({
  code: yup
    .string()
    .min(3, ErrorGenerator.MiniLength<SubscriptionPlanFilter>('code', 3)),
  id: yup
    .number()
    .min(1, ErrorGenerator.MinValue<SubscriptionPlanFilter>('id', 1)),
  limit: yup
    .number()
    .max(1000, ErrorGenerator.MaxValue<SubscriptionPlanFilter>('id', 1000))
    .min(1, ErrorGenerator.MinValue<SubscriptionPlanFilter>('id', 1)),
  skip: yup
    .number()
    .min(1, ErrorGenerator.MinValue<SubscriptionPlanFilter>('id', 1)),
  slug: yup.string(),
  sort_by: yup.mixed<SubscriptionPlanSort>(),
});
