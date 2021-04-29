import {ArgsType, Field, InputType, Int} from '@nestjs/graphql';
import {Min} from 'class-validator';
import * as Relay from 'graphql-relay';
import {OrderBy} from '../../common/order-by.enum';

@InputType()
export class UserWishBooksArgsOrderBy {
  @Field(() => OrderBy, {nullable: true, defaultValue: OrderBy.DESC})
  updatedAt!: OrderBy;
}

@ArgsType()
export class UserWishBooksArgs {
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

  @Field(() => UserWishBooksArgsOrderBy, {
    nullable: true,
    defaultValue: new UserWishBooksArgsOrderBy(),
  })
  orderBy!: UserWishBooksArgsOrderBy;
}
