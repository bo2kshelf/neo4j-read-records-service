import {ArgsType, Field, InputType, Int, ObjectType} from '@nestjs/graphql';
import {OrderBy} from '../../common/order-by.enum';
import {StackedBookRecordEntity} from '../stacked-book.entity';

@InputType()
export class UserStackedBooksArgsOrderBy {
  @Field(() => OrderBy, {nullable: true, defaultValue: OrderBy.DESC})
  updatedAt!: OrderBy;
}

@ArgsType()
export class UserStackedBooksArgs {
  @Field(() => Int, {nullable: true, defaultValue: 0})
  skip!: number;

  @Field(() => Int, {nullable: true, defaultValue: 0})
  limit!: number;

  @Field(() => UserStackedBooksArgsOrderBy, {
    nullable: true,
    defaultValue: new UserStackedBooksArgsOrderBy(),
  })
  orderBy!: UserStackedBooksArgsOrderBy;
}

@ObjectType()
export class UserStackedBooksReturnType {
  @Field(() => [StackedBookRecordEntity])
  nodes!: StackedBookRecordEntity[];

  @Field(() => Int)
  count!: number;

  @Field(() => Boolean)
  hasPrevious!: boolean;

  @Field(() => Boolean)
  hasNext!: boolean;
}
