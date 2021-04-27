import {Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {BookEntity} from '../../books/entities/book.entity';
import {UserEntity} from '../../users/entities/users.entity';
import {ReadBookRecordEntity} from '../entities/read-book.entity';

@Resolver(() => ReadBookRecordEntity)
export class ReadBookRecordsResolver {
  constructor() {}

  @ResolveField(() => UserEntity)
  async user(@Parent() {userId}: ReadBookRecordEntity): Promise<UserEntity> {
    return {id: userId};
  }

  @ResolveField(() => BookEntity)
  async book(@Parent() {bookId}: ReadBookRecordEntity): Promise<BookEntity> {
    return {id: bookId};
  }
}
