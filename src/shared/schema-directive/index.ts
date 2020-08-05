/* eslint-disable import/no-default-export */
import { DeprecatedDirective } from './deprecated.validator';
import { ValidateDirective } from './validator.directive';

export default {
  validate: ValidateDirective,
  deprecated: DeprecatedDirective,
};
