import {Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {BookEntity} from '../../books/entities/book.entity';
import {UserEntity} from '../entities/users.entity';
import {WishBookRecordEntity} from '../entities/wish-read-book-record.entity';

@Resolver(() => WishBookRecordEntity)
export class WishBookRecordsResolver {
  @ResolveField(() => UserEntity)
  async user(@Parent() {userId}: WishBookRecordEntity): Promise<UserEntity> {
    return {id: userId};
  }

  @ResolveField(() => BookEntity)
  async book(@Parent() {bookId}: WishBookRecordEntity): Promise<BookEntity> {
    return {id: bookId};
  }
}
