import {ObjectType} from '@nestjs/graphql';

@ObjectType('ReadBook')
export class ReadBookEntity {
  userId!: string;
  bookId!: string;
}
