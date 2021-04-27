import {Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {BookEntity} from '../../books/entities/book.entity';
import {UserEntity} from '../../users/entities/users.entity';
import {StackedBookRecordEntity} from '../entities/stacked-book-record.entity';

@Resolver(() => StackedBookRecordEntity)
export class StackedBookRecordsResolver {
  @ResolveField(() => UserEntity)
  async user(@Parent() {userId}: StackedBookRecordEntity): Promise<UserEntity> {
    return {id: userId};
  }

  @ResolveField(() => BookEntity)
  async book(@Parent() {bookId}: StackedBookRecordEntity): Promise<BookEntity> {
    return {id: bookId};
  }
}
