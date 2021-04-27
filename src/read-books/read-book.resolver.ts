import {Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {BookEntity} from '../books/entities/book.entity';
import {UserEntity} from '../users/users.entity';
import {ReadBookEntity} from './read-book.entity';

@Resolver(() => ReadBookEntity)
export class ReadBooksResolver {
  constructor() {}

  @ResolveField(() => UserEntity)
  async user(@Parent() {userId}: ReadBookEntity): Promise<UserEntity> {
    return {id: userId};
  }

  @ResolveField(() => BookEntity)
  async book(@Parent() {bookId}: ReadBookEntity): Promise<BookEntity> {
    return {id: bookId};
  }
}
