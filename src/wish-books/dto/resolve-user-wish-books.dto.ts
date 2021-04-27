import {ArgsType, Field, InputType, Int, ObjectType} from '@nestjs/graphql';
import {OrderBy} from '../../common/order-by.enum';
import {WishBookRecordEntity} from '../wish-book.entity';

@InputType()
export class UserWishBooksArgsOrderBy {
  @Field(() => OrderBy, {nullable: true, defaultValue: OrderBy.DESC})
  updatedAt!: OrderBy;
}

@ArgsType()
export class UserWishBooksArgs {
  @Field(() => Int, {nullable: true, defaultValue: 0})
  skip!: number;

  @Field(() => Int, {nullable: true, defaultValue: 0})
  limit!: number;

  @Field(() => UserWishBooksArgsOrderBy, {
    nullable: true,
    defaultValue: new UserWishBooksArgsOrderBy(),
  })
  orderBy!: UserWishBooksArgsOrderBy;
}

@ObjectType()
export class UserWishBooksReturnType {
  @Field(() => [WishBookRecordEntity])
  nodes!: WishBookRecordEntity[];

  @Field(() => Int)
  count!: number;

  @Field(() => Boolean)
  hasPrevious!: boolean;

  @Field(() => Boolean)
  hasNext!: boolean;
}
