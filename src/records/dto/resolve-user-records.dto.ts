import {ArgsType, Field, InputType, Int, ObjectType} from '@nestjs/graphql';
import {OrderBy} from '../../common/order-by.enum';
import {RecordEntity} from '../record.entity';

@InputType()
export class UserRecordsArgsOrderBy {
  @Field(() => OrderBy, {nullable: true, defaultValue: OrderBy.DESC})
  readAt!: OrderBy;
}

@ArgsType()
export class UserRecordsArgs {
  @Field(() => Int, {nullable: true, defaultValue: 0})
  skip!: number;

  @Field(() => Int, {nullable: true, defaultValue: 0})
  limit!: number;

  @Field(() => UserRecordsArgsOrderBy, {
    nullable: true,
    defaultValue: new UserRecordsArgsOrderBy(),
  })
  orderBy!: UserRecordsArgsOrderBy;
}

@ObjectType()
export class UserRecordsReturnType {
  @Field(() => [RecordEntity])
  nodes!: RecordEntity[];

  @Field(() => Int)
  count!: number;

  @Field(() => Boolean)
  hasPrevious!: boolean;

  @Field(() => Boolean)
  hasNext!: boolean;
}
