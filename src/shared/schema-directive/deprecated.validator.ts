/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { GraphQLEnumValue, GraphQLField } from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';

export class DeprecatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    field.isDeprecated = true;
    field.deprecationReason = this.args.reason;
  }

  visitEnumValue(value: GraphQLEnumValue) {
    value.isDeprecated = true;
    value.deprecationReason = this.args.reason;
  }
}
