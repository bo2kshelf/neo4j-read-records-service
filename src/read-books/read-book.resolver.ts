import {Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {BookEntity} from '../books/entities/book.entity';
import {UserEntity} from '../users/users.entity';
import {ReadBookRecordEntity} from './read-book.entity';

@Resolver(() => ReadBookRecordEntity)
export class ReadBooksResolver {
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
