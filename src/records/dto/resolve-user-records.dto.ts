import {ArgsType, Field, InputType, Int} from '@nestjs/graphql';
import {Min} from 'class-validator';
import * as Relay from 'graphql-relay';
import {OrderBy} from '../../common/order-by.enum';

@InputType()
export class UserRecordsArgsOrderBy {
  @Field(() => OrderBy, {nullable: true, defaultValue: OrderBy.DESC})
  readAt!: OrderBy;
}

@ArgsType()
export class UserRecordsArgs {
  @Field((_type) => String, {nullable: true})
  after?: Relay.ConnectionCursor;

  @Field((_type) => Int, {nullable: true})
  @Min(1)
  first?: number;

  @Field((_type) => String, {nullable: true})
  before?: Relay.ConnectionCursor;

  @Field((_type) => Int, {nullable: true})
  @Min(1)
  last?: number;

  @Field(() => UserRecordsArgsOrderBy, {
    nullable: true,
    defaultValue: new UserRecordsArgsOrderBy(),
  })
  orderBy!: UserRecordsArgsOrderBy;
}
