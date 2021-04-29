import {Injectable} from '@nestjs/common';
import * as Relay from 'graphql-relay';

@Injectable()
export class PaginateService {
  constructor() {}

  getPagingParameters(
    args:
      | Record<string, never>
      | {first: number}
      | {first: number; after: Relay.ConnectionCursor}
      | {last: number}
      | {last: number; before: Relay.ConnectionCursor},
  ): {limit: number; skip: number} {
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
}
