import {Field, GraphQLISODateTime, Int, ObjectType} from '@nestjs/graphql';
import * as Relay from 'graphql-relay';
import {PageInfo} from '../paginate/paginate.entities';

@ObjectType('UserHaveBook')
export class UserHaveBookEntity {
  userId!: string;
  bookId!: string;

  @Field(() => Boolean)
  have!: boolean;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}

@ObjectType()
export class UserHaveBookEdge {
  @Field((_type) => String)
  cursor!: Relay.ConnectionCursor;

  @Field((_type) => UserHaveBookEntity)
  node!: UserHaveBookEntity;
}

@ObjectType()
export class UserHaveBookConnection {
  @Field(() => [UserHaveBookEdge])
  edges!: UserHaveBookEdge[];

  @Field(() => PageInfo)
  pageInfo!: PageInfo;

  @Field(() => Int!)
  totalCount!: number;
}
