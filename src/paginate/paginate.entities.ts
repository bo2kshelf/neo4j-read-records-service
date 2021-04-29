import {Field, ObjectType} from '@nestjs/graphql';
import * as Relay from 'graphql-relay';

@ObjectType()
export class PageInfo {
  @Field((_type) => String, {nullable: true})
  startCursor?: Relay.PageInfo['startCursor'];

  @Field((_type) => String, {nullable: true})
  endCursor?: Relay.PageInfo['endCursor'];

  @Field((_type) => Boolean, {nullable: true})
  hasPreviousPage?: Relay.PageInfo['hasPreviousPage'];

  @Field((_type) => Boolean, {nullable: true})
  hasNextPage?: Relay.PageInfo['hasNextPage'];
}
