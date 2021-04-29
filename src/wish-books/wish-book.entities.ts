import {Field, GraphQLISODateTime, Int, ObjectType} from '@nestjs/graphql';
import * as Relay from 'graphql-relay';
import {PageInfo} from '../paginate/paginate.entities';

@ObjectType('UserWishBook')
export class UserWishBookEntity {
  userId!: string;
  bookId!: string;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}

@ObjectType()
export class UserWishBookEdge {
  @Field((_type) => String)
  cursor!: Relay.ConnectionCursor;

  @Field((_type) => UserWishBookEntity)
  node!: UserWishBookEntity;
}

@ObjectType()
export class UserWishBooksConnection {
  @Field(() => [UserWishBookEdge])
  edges!: UserWishBookEdge[];

  @Field(() => PageInfo)
  pageInfo!: PageInfo;

  @Field(() => Int!)
  totalCount!: number;
}
