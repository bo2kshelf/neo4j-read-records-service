import {Field, GraphQLISODateTime, Int, ObjectType} from '@nestjs/graphql';
import * as Relay from 'graphql-relay';
import {PageInfo} from '../paginate/paginate.entities';

@ObjectType('UserReadingBook')
export class UserReadingBookEntity {
  userId!: string;
  bookId!: string;

  @Field(() => Boolean)
  reading!: boolean;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}

@ObjectType()
export class UserReadingBookEdge {
  @Field((_type) => String)
  cursor!: Relay.ConnectionCursor;

  @Field((_type) => UserReadingBookEntity)
  node!: UserReadingBookEntity;
}

@ObjectType()
export class UserReadingBookConnection {
  @Field(() => [UserReadingBookEdge])
  edges!: UserReadingBookEdge[];

  @Field(() => PageInfo)
  pageInfo!: PageInfo;

  @Field(() => Int!)
  totalCount!: number;
}
