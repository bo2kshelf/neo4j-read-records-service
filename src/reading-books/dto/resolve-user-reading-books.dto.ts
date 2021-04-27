import {ArgsType, Field, InputType, Int, ObjectType} from '@nestjs/graphql';
import {OrderBy} from '../../common/order-by.enum';
import {ReadingBookRecordEntity} from '../reading-book.entity';

@InputType()
export class UserReadingBooksArgsOrderBy {
  @Field(() => OrderBy, {nullable: true, defaultValue: OrderBy.DESC})
  updatedAt!: OrderBy;
}

@ArgsType()
export class UserReadingBooksArgs {
  @Field(() => Int, {nullable: true, defaultValue: 0})
  skip!: number;

  @Field(() => Int, {nullable: true, defaultValue: 0})
  limit!: number;

  @Field(() => UserReadingBooksArgsOrderBy, {
    nullable: true,
    defaultValue: new UserReadingBooksArgsOrderBy(),
  })
  orderBy!: UserReadingBooksArgsOrderBy;
}

@ObjectType()
export class UserReadingBooksReturnType {
  @Field(() => [ReadingBookRecordEntity])
  nodes!: ReadingBookRecordEntity[];

  @Field(() => Int)
  count!: number;

  @Field(() => Boolean)
  hasPrevious!: boolean;

  @Field(() => Boolean)
  hasNext!: boolean;
}
