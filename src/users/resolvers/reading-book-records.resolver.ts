import {Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {BookEntity} from '../../books/entities/book.entity';
import {ReadingBookRecordEntity} from '../entities/reading-book-record.entity';
import {StackedBookRecordEntity} from '../entities/stacked-book-record.entity';
import {UserEntity} from '../entities/users.entity';
import {UsersService} from '../services/users.service';

@Resolver(() => ReadingBookRecordEntity)
export class ReadingBookRecordResolver {
  constructor(private readonly usersService: UsersService) {}

  @ResolveField(() => UserEntity)
  async user(@Parent() {userId}: ReadingBookRecordEntity): Promise<UserEntity> {
    return this.usersService.findById(userId);
  }

  @ResolveField(() => BookEntity)
  async book(@Parent() {bookId}: StackedBookRecordEntity): Promise<BookEntity> {
    return {id: bookId};
  }
}
