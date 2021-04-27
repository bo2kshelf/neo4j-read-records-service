import {Field, GraphQLISODateTime, ObjectType} from '@nestjs/graphql';

@ObjectType('WishBookRecord')
export class WishBookRecordEntity {
  userId!: string;
  bookId!: string;

  @Field(() => Boolean)
  wish!: boolean;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}
