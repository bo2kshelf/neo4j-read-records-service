import {Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {BookEntity} from '../../books/entities/book.entity';
import {UserEntity} from '../../users/entities/users.entity';
import {HaveBookRecordEntity} from '../entities/have-book-record.entity';

@Resolver(() => HaveBookRecordEntity)
export class HaveBookRecordsResolver {
  @ResolveField(() => UserEntity)
  async user(@Parent() {userId}: HaveBookRecordEntity): Promise<UserEntity> {
    return {id: userId};
  }

  @ResolveField(() => BookEntity)
  async book(@Parent() {bookId}: HaveBookRecordEntity): Promise<BookEntity> {
    return {id: bookId};
  }
}
