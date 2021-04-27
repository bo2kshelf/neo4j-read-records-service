import {Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {BookEntity} from '../books/entities/book.entity';
import {UserEntity} from '../users/users.entity';
import {WishBookEntity} from './wish-book.entity';

@Resolver(() => WishBookEntity)
export class WishBooksResolver {
  @ResolveField(() => UserEntity)
  async user(@Parent() {userId}: WishBookEntity): Promise<UserEntity> {
    return {id: userId};
  }

  @ResolveField(() => BookEntity)
  async book(@Parent() {bookId}: WishBookEntity): Promise<BookEntity> {
    return {id: bookId};
  }
}
