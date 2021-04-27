import {Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {BookEntity} from '../../books/entities/book.entity';
import {ReadingBookRecordEntity} from '../entities/reading-book-record.entity';
import {UserEntity} from '../entities/users.entity';

@Resolver(() => ReadingBookRecordEntity)
export class ReadingBookRecordsResolver {
  @ResolveField(() => UserEntity)
  async user(@Parent() {userId}: ReadingBookRecordEntity): Promise<UserEntity> {
    return {id: userId};
  }

  @ResolveField(() => BookEntity)
  async book(@Parent() {bookId}: ReadingBookRecordEntity): Promise<BookEntity> {
    return {id: bookId};
  }
}
