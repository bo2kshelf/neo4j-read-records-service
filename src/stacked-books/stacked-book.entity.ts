import {Field, Int, ObjectType} from '@nestjs/graphql';
import * as Relay from 'graphql-relay';
import {PageInfo} from '../paginate/paginate.entities';

@ObjectType('UserStackedBook')
export class UserStackedBookEntity {
  userId!: string;
  bookId!: string;
}

@ObjectType()
export class UserStackedBookEdge {
  @Field((_type) => String)
  cursor!: Relay.ConnectionCursor;

  @Field((_type) => UserStackedBookEntity)
  node!: UserStackedBookEntity;
}

@ObjectType()
export class UserStackedBookConnection {
  @Field(() => [UserStackedBookEdge])
  edges!: UserStackedBookEdge[];

  @Field(() => PageInfo)
  pageInfo!: PageInfo;

  @Field(() => Int!)
  totalCount!: number;
}
