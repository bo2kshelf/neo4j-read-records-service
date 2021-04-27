import {ObjectType} from '@nestjs/graphql';

@ObjectType('StackedBook')
export class StackedBookEntity {
  userId!: string;
  bookId!: string;
}
