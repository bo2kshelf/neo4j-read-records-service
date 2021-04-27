import {Args, ID, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {BookEntity} from '../../books/entities/book.entity';
import {UserEntity} from '../../users/entities/users.entity';
import {UsersService} from '../../users/services/users.service';
import {RecordEntity} from '../entities/record.entity';
import {RecordsService} from '../services/records.service';

@Resolver(() => RecordEntity)
export class RecordResolver {
  constructor(
    private readonly recordsService: RecordsService,
    private readonly usersService: UsersService,
  ) {}

  @Query(() => RecordEntity)
  async record(
    @Args('id', {type: () => ID}) id: string,
  ): Promise<RecordEntity> {
    return this.recordsService.findById(id);
  }

  @ResolveField(() => UserEntity)
  async user(@Parent() {userId}: RecordEntity): Promise<UserEntity> {
    return {id: userId};
  }

  @ResolveField(() => BookEntity)
  async book(@Parent() {bookId}: RecordEntity): Promise<BookEntity> {
    return {id: bookId};
  }
}
