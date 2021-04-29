import {Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {BookEntity} from '../books/entities/book.entity';
import {UserEntity} from '../users/users.entity';
import {UserWishBookEntity} from './wish-book.entities';

@Resolver(() => UserWishBookEntity)
export class WishBooksResolver {
  @ResolveField(() => UserEntity)
  async user(@Parent() {userId}: UserWishBookEntity): Promise<UserEntity> {
    return {id: userId};
  }

  @ResolveField(() => BookEntity)
  async book(@Parent() {bookId}: UserWishBookEntity): Promise<BookEntity> {
    return {id: bookId};
  }
}
