import {Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {BookEntity} from '../books/entities/book.entity';
import {UserEntity} from '../users/users.entity';
import {UserReadBookEntity} from './read-book.entity';

@Resolver(() => UserReadBookEntity)
export class ReadBooksResolver {
  constructor() {}

  @ResolveField(() => UserEntity)
  async user(@Parent() {userId}: UserReadBookEntity): Promise<UserEntity> {
    return {id: userId};
  }

  @ResolveField(() => BookEntity)
  async book(@Parent() {bookId}: UserReadBookEntity): Promise<BookEntity> {
    return {id: bookId};
  }
}
