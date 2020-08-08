/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { injectable } from 'inversify';
import _ from 'lodash';

import { createEverLogger } from '../../helpers/Log';
import { ErrorGenerator } from '../../shared/errors.generator';
import {
  BadRequestError,
  NotFoundError,
  ParseError,
} from '../../shared/errors.messages';
import { DatabaseService } from '../database/database.service';
import { servicesContainer } from '../inversify.config';
import { IService } from '../IService';
import { SubscriptionPlans } from './model/subscription_plan.model';
import {
  DeleteSubscriptionPlanResponse,
  ISubscriptionPlanService,
  SubscriptionInputPayload,
  SubscriptionPlan,
  SubscriptionPlanFilter,
  SubscriptionPlanResponse,
  UpdateSubscriptionPlanResponse,
} from './types/subscription_plan.types';
import { subscriptionPlanCreateSchema } from './validators/subscription_plan.create.yup';
import { subscriptionPlanFilterSchema } from './validators/subscription_plan.filter.yup';

/**
 * Subscription Plans Service
 * CRUD operation for Subscription Plan
 * @export
 * @class SubscriptionPlanService
 * @implements {ISubscriptionPlanService}
 * @implements {IService}
 */
@injectable()
export class SubscriptionPlanService
  implements ISubscriptionPlanService, IService {
  private logger = createEverLogger({ name: 'SubscriptionPlanService' });
  private dbService = servicesContainer.get<DatabaseService>(DatabaseService);
  async create(payload: SubscriptionInputPayload): Promise<SubscriptionPlan> {
    let result: SubscriptionPlan;
    try {
      await subscriptionPlanCreateSchema.validate(payload, {
        abortEarly: false,
      });

      result = await this.dbService.create<SubscriptionPlan, SubscriptionPlans>(
        new SubscriptionPlans({ ...payload }),
      );
      this.logger.debug('Subscription Plan added Successfully', result);
    } catch (e) {
      this.logger.error(e);
      ParseError(e, ErrorGenerator.Duplicate('Subscription Plan'));
    }
    if (!_.isEmpty(result.id)) {
      return result;
    }
    throw BadRequestError(ErrorGenerator.UnableSave('Subscription Plan'));
  }
  async findOne(where: SubscriptionPlanFilter): Promise<SubscriptionPlan> {
    let edge: SubscriptionPlan;
    try {
      // Validate Input
      await subscriptionPlanFilterSchema.validate(where, {
        abortEarly: false,
      });
      edge = await this.dbService.findOne<
        SubscriptionPlan,
        SubscriptionPlanFilter
      >(where);
    } catch (e) {
      this.logger.error(e);
      ParseError(e, ErrorGenerator.NotFound('Subscription Plan'));
    }
    if (!_.isEmpty(edge)) {
      return edge;
    }
    throw NotFoundError(ErrorGenerator.NotFound('Subscription Plan'));
  }
  async findAll(
    where?: SubscriptionPlanFilter,
  ): Promise<SubscriptionPlanResponse> {
    // Validate the Input

    let edges: SubscriptionPlan[];
    let count: number; // Rows counts
    let recordLimit = 10; // Pagination Limit
    let recordSkip = 0; // Pagination: SKIP

    // TODO
    // Transform from Object to Array
    // { id: SortDirection.ASC } to [ "id", "ASC"]
    // for (const [key, value] of Object.entries(sortBy)) {
    //   sortOrder.push([key, value]);
    // }
    try {
      await subscriptionPlanFilterSchema.validate(where, {
        abortEarly: false,
      });
      if (where) {
        const id = where?.id;
        const limit = where?.limit;
        const skip = where?.skip;
        // isNil check for for null or undefined
        if (!_.isNil(id) && !_.isNil(limit) && !_.isNil(skip)) {
          // Set Limit and Skip for `page_info`
          recordLimit = limit;
          recordSkip = skip;
          // Load the SubscriptionPlan with ID and Pagination
          [edges, count] = await this.dbService.findAll<
            SubscriptionPlan,
            Partial<SubscriptionPlanFilter>
          >({ id }, recordLimit, recordSkip);
        } else if (!_.isNil(limit) && !_.isNil(skip)) {
          // Set Limit and Skip for `page_info`
          recordLimit = limit;
          recordSkip = skip;
          // Load All SubscriptionPlan with default pagination
          [edges, count] = await this.dbService.findAll<
            SubscriptionPlan,
            Partial<SubscriptionPlanFilter>
          >(null, recordLimit, recordSkip);
        } else if (!_.isNil(id)) {
          // Load All SubscriptionPlan with id with default pagination
          [edges, count] = await this.dbService.findAll<
            SubscriptionPlan,
            Partial<SubscriptionPlanFilter>
          >({ id }, recordLimit, recordSkip);
        }
      } else {
        // Load All SubscriptionPlan with default pagination
        [edges, count] = await this.dbService.findAll<
          SubscriptionPlan,
          Partial<SubscriptionPlanFilter>
        >(null, recordLimit, recordSkip);
      }
    } catch (error) {
      // Empty
    }
    // Validate edges are not empty
    if (!_.isEmpty(edges)) {
      return {
        edges,
        page_info: {
          total: count,
          limit: recordLimit,
          skip: recordSkip,
          has_more: count > recordLimit + recordSkip ? true : false,
        },
      };
    }
    throw NotFoundError(ErrorGenerator.NotFound('Subscription Plan'));
  }
  count(where?: SubscriptionPlanFilter): Promise<number> {
    throw new Error('Method not implemented.');
  }
  update(
    payload: SubscriptionInputPayload,
    where: SubscriptionPlanFilter,
  ): Promise<UpdateSubscriptionPlanResponse> {
    throw new Error('Method not implemented.');
  }
  delete(
    where: SubscriptionPlanFilter,
  ): Promise<DeleteSubscriptionPlanResponse> {
    throw new Error('Method not implemented.');
  }
}
