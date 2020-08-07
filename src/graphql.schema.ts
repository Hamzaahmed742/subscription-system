/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class IntComparisonExp {
    _eq?: number;
    _gt?: number;
    _gte?: number;
    _in?: number[];
    _is_null?: boolean;
    _lt?: number;
    _lte?: number;
    _neq?: number;
    _nin?: number[];
}

export class StringComparisonExp {
    _eq?: string;
    _gt?: string;
    _gte?: string;
    _ilike?: string;
    _in?: string[];
    _is_null?: boolean;
    _like?: string;
    _lt?: string;
    _lte?: string;
    _neq?: string;
    _nilike?: string;
    _nin?: string[];
    _nlike?: string;
    _nsimilar?: string;
    _similar?: string;
}

export class IPaginationInfo {
    has_more: boolean;
    total: number;
    limit: number;
    skip: number;
}

export class Hello {
    name?: string;
}

export abstract class IQuery {
    abstract sayHello(payload?: string): Hello | Promise<Hello>;
}

export type date = any;
export type JSON = any;
export type JSONObject = any;
