import {ObjectType} from '@nestjs/graphql';

@ObjectType('ReadBookRecord')
export class ReadBookRecordEntity {
  userId!: string;
  bookId!: string;
}
