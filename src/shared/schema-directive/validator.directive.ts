/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Logger } from '@nestjs/common';
import { UserInputError } from 'apollo-server-core';
import { validate } from 'class-validator';
import {
  defaultFieldResolver,
  GraphQLArgument,
  GraphQLField,
  GraphQLObjectType,
} from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';
import _ from 'lodash';

import * as GraphqlSchema from '../../graphql.schema';

export class ValidateDirective extends SchemaDirectiveVisitor {
  visitArgumentDefinition(
    arg: GraphQLArgument,
    details: {
      field: GraphQLField<any, any>;
      objectType: GraphQLObjectType;
    },
  ) {
    const { field } = details;
    const { resolve = defaultFieldResolver } = field;

    const { schema } = this.args;
    const logger = new Logger('ValidatorDirective', true);

    field.resolve = async (...args) => {
      const { payload } = args[1];

      const prototype = arg.type.toString().replace('!', '');
      // eslint-disable-next-line import/namespace
      const object = new GraphqlSchema[prototype]();

      Object.assign(object, payload);
      const errors = await validate(schema, object);
      if (!_.isEmpty(errors)) {
        logger.log(errors, 'Validation.error');
      }

      if (errors.length > 0) {
        throw new UserInputError(
          `Input Arguments invalid: ${errors
            .map((err) => {
              // tslint:disable-next-line: forin
              // eslint-disable-next-line guard-for-in
              for (const property in err.constraints) {
                return err.constraints[property];
              }
            })
            .join(', ')}`,
        );
      }

      return resolve.apply(this, args);
    };
  }
}
