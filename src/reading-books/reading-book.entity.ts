import {Field, GraphQLISODateTime, ObjectType} from '@nestjs/graphql';

@ObjectType('ReadingBook')
export class ReadingBookEntity {
  userId!: string;
  bookId!: string;

  @Field(() => Boolean)
  reading!: boolean;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}
