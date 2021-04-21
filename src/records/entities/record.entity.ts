import {Field, ID, ObjectType} from '@nestjs/graphql';
import {LocalDateResolver} from 'graphql-scalars';

@ObjectType('Record')
export class RecordEntity {
  @Field(() => ID)
  id!: string;

  userId!: string;
  bookId!: string;

  @Field(() => LocalDateResolver, {nullable: true})
  readAt?: string;
}
