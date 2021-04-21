import {Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {BookEntity} from '../../books/entities/book.entity';
import {HaveBookRecordEntity} from '../entities/have-book-record.entity';
import {UserEntity} from '../entities/users.entity';
import {UsersService} from '../services/users.service';

@Resolver(() => HaveBookRecordEntity)
export class HaveBookRecordResolver {
  constructor(private readonly usersService: UsersService) {}

  @ResolveField(() => UserEntity)
  async user(@Parent() {userId}: HaveBookRecordEntity): Promise<UserEntity> {
    return this.usersService.findById(userId);
  }

  @ResolveField(() => BookEntity)
  async book(@Parent() {bookId}: HaveBookRecordEntity): Promise<BookEntity> {
    return {id: bookId};
  }
}
