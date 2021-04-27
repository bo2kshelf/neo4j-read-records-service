import {ArgsType, Field, InputType, Int, ObjectType} from '@nestjs/graphql';
import {OrderBy} from '../../../common/order-by.enum';
import {ReadBookRecordEntity} from '../../entities/read-book.entity';

@InputType()
export class UserReadBooksArgsOrderBy {
  @Field(() => OrderBy, {nullable: true, defaultValue: OrderBy.ASC})
  title!: OrderBy;
}

@ArgsType()
export class UserReadBooksArgs {
  @Field(() => Int, {nullable: true, defaultValue: 0})
  skip!: number;

  @Field(() => Int, {nullable: true, defaultValue: 0})
  limit!: number;

  @Field(() => UserReadBooksArgsOrderBy, {
    nullable: true,
    defaultValue: new UserReadBooksArgsOrderBy(),
  })
  orderBy!: UserReadBooksArgsOrderBy;
}

@ObjectType()
export class UserReadBooksReturnType {
  @Field(() => [ReadBookRecordEntity])
  nodes!: ReadBookRecordEntity[];

  @Field(() => Int)
  count!: number;

  @Field(() => Boolean)
  hasPrevious!: boolean;

  @Field(() => Boolean)
  hasNext!: boolean;
}
