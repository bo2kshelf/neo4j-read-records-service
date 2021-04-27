import {Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {BookEntity} from '../books/entities/book.entity';
import {UserEntity} from '../users/users.entity';
import {HaveBookEntity} from './have-book.entity';

@Resolver(() => HaveBookEntity)
export class HaveBooksResolver {
  @ResolveField(() => UserEntity)
  async user(@Parent() {userId}: HaveBookEntity): Promise<UserEntity> {
    return {id: userId};
  }

  @ResolveField(() => BookEntity)
  async book(@Parent() {bookId}: HaveBookEntity): Promise<BookEntity> {
    return {id: bookId};
  }
}
