import {Field, Int, ObjectType} from '@nestjs/graphql';
import * as Relay from 'graphql-relay';
import {PageInfo} from '../paginate/paginate.entities';

@ObjectType('UserReadBook')
export class UserReadBookEntity {
  userId!: string;
  bookId!: string;
}

@ObjectType()
export class UserReadBookEdge {
  @Field((_type) => String)
  cursor!: Relay.ConnectionCursor;

  @Field((_type) => UserReadBookEntity)
  node!: UserReadBookEntity;
}

@ObjectType()
export class UserReadBookConnection {
  @Field(() => [UserReadBookEdge])
  edges!: UserReadBookEdge[];

  @Field(() => PageInfo)
  pageInfo!: PageInfo;

  @Field(() => Int!)
  totalCount!: number;
}
