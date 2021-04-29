import {Injectable} from '@nestjs/common';
import * as Relay from 'graphql-relay';

export type PaginateParameter =
  | Record<string, never>
  | {first: number}
  | {first: number; after: Relay.ConnectionCursor}
  | {last: number}
  | {last: number; before: Relay.ConnectionCursor};

@Injectable()
export class PaginateService {
  constructor() {}

  transformArgsToParameter(props: {
    first?: number;
    after?: Relay.ConnectionCursor;
    last?: number;
    before?: Relay.ConnectionCursor;
  }): PaginateParameter {
    if ('first' in props && props.first)
      return 'after' in props && props.after
        ? {first: props.first, after: props.after}
        : {first: props.first};
    else if ('last' in props && props.last)
      return 'before' in props && props.before
        ? {last: props.last, before: props.before}
        : {last: props.last};
    else return {};
  }

  getSkipAndLimit(args: PaginateParameter): {limit: number; skip: number} {
    if ('first' in args) {
      return {
        limit: args.first,
        skip: 'after' in args ? Relay.cursorToOffset(args.after) + 1 : 0,
      };
    } else if ('last' in args && 'before' in args) {
      const offset = Relay.cursorToOffset(args.before);

      return {
        limit: Math.min(args.last, Math.max(offset - 1, 0)),
        skip: Math.max(offset - 1 - args.last, 0),
      };
    } else return {limit: 0, skip: 0};
  }

  transformToConnection<T>(
    node: T[],
    args: PaginateParameter,
    {count}: {count: number},
    {skip}: {skip: number},
  ) {
    const connection = Relay.connectionFromArraySlice(node, args, {
      arrayLength: count,
      sliceStart: skip,
    });
    return {...connection, totalCount: count};
  }
}
