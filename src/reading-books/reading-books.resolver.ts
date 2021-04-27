import {Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {BookEntity} from '../books/entities/book.entity';
import {UserEntity} from '../users/users.entity';
import {ReadingBookEntity} from './reading-book.entity';

@Resolver(() => ReadingBookEntity)
export class ReadingBooksResolver {
  @ResolveField(() => UserEntity)
  async user(@Parent() {userId}: ReadingBookEntity): Promise<UserEntity> {
    return {id: userId};
  }

  @ResolveField(() => BookEntity)
  async book(@Parent() {bookId}: ReadingBookEntity): Promise<BookEntity> {
    return {id: bookId};
  }
}
