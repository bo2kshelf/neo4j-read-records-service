import {Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {BookEntity} from '../books/entities/book.entity';
import {UserEntity} from '../users/users.entity';
import {UserReadingBookEntity} from './reading-book.entity';

@Resolver(() => UserReadingBookEntity)
export class ReadingBooksResolver {
  @ResolveField(() => UserEntity)
  async user(@Parent() {userId}: UserReadingBookEntity): Promise<UserEntity> {
    return {id: userId};
  }

  @ResolveField(() => BookEntity)
  async book(@Parent() {bookId}: UserReadingBookEntity): Promise<BookEntity> {
    return {id: bookId};
  }
}
