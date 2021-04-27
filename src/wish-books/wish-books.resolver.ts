import {Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {BookEntity} from '../books/entities/book.entity';
import {UserEntity} from '../users/users.entity';
import {WishBookRecordEntity} from './wish-book.entity';

@Resolver(() => WishBookRecordEntity)
export class WishBooksResolver {
  @ResolveField(() => UserEntity)
  async user(@Parent() {userId}: WishBookRecordEntity): Promise<UserEntity> {
    return {id: userId};
  }

  @ResolveField(() => BookEntity)
  async book(@Parent() {bookId}: WishBookRecordEntity): Promise<BookEntity> {
    return {id: bookId};
  }
}
