import {Field, GraphQLISODateTime, ObjectType} from '@nestjs/graphql';

@ObjectType('WishBook')
export class WishBookEntity {
  userId!: string;
  bookId!: string;

  @Field(() => Boolean)
  wish!: boolean;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}
