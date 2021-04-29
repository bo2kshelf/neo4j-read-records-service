import {Field, ID, Int, ObjectType} from '@nestjs/graphql';
import * as Relay from 'graphql-relay';
import {LocalDateResolver} from 'graphql-scalars';
import {PageInfo} from '../paginate/paginate.entities';

@ObjectType('UserRecord')
export class UserRecordEntity {
  @Field(() => ID)
  id!: string;

  userId!: string;
  bookId!: string;

  @Field(() => LocalDateResolver, {nullable: true})
  readAt?: string;
}

@ObjectType()
export class UserRecordEdge {
  @Field((_type) => String)
  cursor!: Relay.ConnectionCursor;

  @Field((_type) => UserRecordEntity)
  node!: UserRecordEntity;
}

@ObjectType()
export class UserRecordConnection {
  @Field(() => [UserRecordEdge])
  edges!: UserRecordEdge[];

  @Field(() => PageInfo)
  pageInfo!: PageInfo;

  @Field(() => Int!)
  totalCount!: number;
}
