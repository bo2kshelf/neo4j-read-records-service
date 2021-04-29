import {Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {BookEntity} from '../books/entities/book.entity';
import {UserEntity} from '../users/users.entity';
import {UserStackedBookEntity} from './stacked-book.entity';

@Resolver(() => UserStackedBookEntity)
export class StackedBooksResolver {
  @ResolveField(() => UserEntity)
  async user(@Parent() {userId}: UserStackedBookEntity): Promise<UserEntity> {
    return {id: userId};
  }

  @ResolveField(() => BookEntity)
  async book(@Parent() {bookId}: UserStackedBookEntity): Promise<BookEntity> {
    return {id: bookId};
  }
}
