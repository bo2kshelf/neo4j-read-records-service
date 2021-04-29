import {ArgsType, Field, InputType, Int} from '@nestjs/graphql';
import {Min} from 'class-validator';
import * as Relay from 'graphql-relay';
import {OrderBy} from '../../common/order-by.enum';

@InputType()
export class UserReadBooksArgsOrderBy {
  @Field(() => OrderBy, {nullable: true, defaultValue: OrderBy.ASC})
  title!: OrderBy;
}

@ArgsType()
export class UserReadBooksArgs {
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

  @Field(() => UserReadBooksArgsOrderBy, {
    nullable: true,
    defaultValue: new UserReadBooksArgsOrderBy(),
  })
  orderBy!: UserReadBooksArgsOrderBy;
}
