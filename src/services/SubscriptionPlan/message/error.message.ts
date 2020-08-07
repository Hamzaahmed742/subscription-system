export const SubscriptionPlanErrorMessage = {
  /* --------------------------------- Length --------------------------------- */
  MIN_NAME_LENGTH: 'Subscription name must be at least 3 characters',
  MAX_NAME_LENGTH: 'Subscription name must not be longer than 50 characters',

  /* -------------------------------- Required -------------------------------- */

  NAME_REQUIRED: 'Please input Subscription name',
  PRICE_REQUIRED: 'Please input Subscription price',
  INVOICE_PERIOD_REQUIRED: 'Please input Subscription invoice_period',
  INVOICE_DURATION_REQUIRED: 'Please input Subscription invoice_duration',

  /* --------------------------------- Numbers -------------------------------- */
  MIN_INVOICE_PERIOD: 'Subscription period must be greater than or equal to 1',
  MIN_TRIAL_PERIOD:
    'Subscription trail period must be greater than or equal to 1',

  /* --------------------------------- Others --------------------------------- */
  INVOICE_PERIOD_DURATION: 'Invoice Period and Duration not matched',
  DUPLICATE: 'Subscription Plan already exists',
  UNABLE_TO_SAVE: 'Unable to save subscription plan',
};
