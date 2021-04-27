import {Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {BookEntity} from '../books/entities/book.entity';
import {UserEntity} from '../users/users.entity';
import {ReadingBookRecordEntity} from './reading-book.entity';

@Resolver(() => ReadingBookRecordEntity)
export class ReadingBooksResolver {
  @ResolveField(() => UserEntity)
  async user(@Parent() {userId}: ReadingBookRecordEntity): Promise<UserEntity> {
    return {id: userId};
  }

  @ResolveField(() => BookEntity)
  async book(@Parent() {bookId}: ReadingBookRecordEntity): Promise<BookEntity> {
    return {id: bookId};
  }
}
