import {ArgsType, Field, InputType, Int} from '@nestjs/graphql';
import {OrderBy} from '../../../common/order-by.enum';

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
