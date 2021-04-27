import {Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {BookEntity} from '../books/entities/book.entity';
import {UserEntity} from '../users/users.entity';
import {StackedBookRecordEntity} from './stacked-book.entity';

@Resolver(() => StackedBookRecordEntity)
export class StackedBooksResolver {
  @ResolveField(() => UserEntity)
  async user(@Parent() {userId}: StackedBookRecordEntity): Promise<UserEntity> {
    return {id: userId};
  }

  @ResolveField(() => BookEntity)
  async book(@Parent() {bookId}: StackedBookRecordEntity): Promise<BookEntity> {
    return {id: bookId};
  }
}
