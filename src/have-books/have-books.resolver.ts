import {Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {BookEntity} from '../books/entities/book.entity';
import {UserEntity} from '../users/users.entity';
import {HaveBookRecordEntity} from './have-book.entity';

@Resolver(() => HaveBookRecordEntity)
export class HaveBooksResolver {
  @ResolveField(() => UserEntity)
  async user(@Parent() {userId}: HaveBookRecordEntity): Promise<UserEntity> {
    return {id: userId};
  }

  @ResolveField(() => BookEntity)
  async book(@Parent() {bookId}: HaveBookRecordEntity): Promise<BookEntity> {
    return {id: bookId};
  }
}
