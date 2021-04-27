import {Field, GraphQLISODateTime, ObjectType} from '@nestjs/graphql';

@ObjectType('HaveBook')
export class HaveBookEntity {
  userId!: string;
  bookId!: string;

  @Field(() => Boolean)
  have!: boolean;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}
