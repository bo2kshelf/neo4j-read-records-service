import {Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {BookEntity} from '../books/entities/book.entity';
import {UserEntity} from '../users/users.entity';
import {StackedBookEntity} from './stacked-book.entity';

@Resolver(() => StackedBookEntity)
export class StackedBooksResolver {
  @ResolveField(() => UserEntity)
  async user(@Parent() {userId}: StackedBookEntity): Promise<UserEntity> {
    return {id: userId};
  }

  @ResolveField(() => BookEntity)
  async book(@Parent() {bookId}: StackedBookEntity): Promise<BookEntity> {
    return {id: bookId};
  }
}
