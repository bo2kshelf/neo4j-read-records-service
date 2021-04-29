import {Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {BookEntity} from '../books/entities/book.entity';
import {UserEntity} from '../users/users.entity';
import {UserHaveBookEntity} from './have-book.entity';

@Resolver(() => UserHaveBookEntity)
export class HaveBooksResolver {
  @ResolveField(() => UserEntity)
  async user(@Parent() {userId}: UserHaveBookEntity): Promise<UserEntity> {
    return {id: userId};
  }

  @ResolveField(() => BookEntity)
  async book(@Parent() {bookId}: UserHaveBookEntity): Promise<BookEntity> {
    return {id: bookId};
  }
}
