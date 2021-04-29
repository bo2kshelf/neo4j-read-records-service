import {Args, ID, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {BookEntity} from '../books/entities/book.entity';
import {UserEntity} from '../users/users.entity';
import {UserRecordEntity} from './record.entities';
import {RecordsService} from './records.service';

@Resolver(() => UserRecordEntity)
export class RecordsResolver {
  constructor(private readonly recordsService: RecordsService) {}

  @ResolveField(() => UserEntity)
  async user(@Parent() {userId}: UserRecordEntity): Promise<UserEntity> {
    return {id: userId};
  }

  @ResolveField(() => BookEntity)
  async book(@Parent() {bookId}: UserRecordEntity): Promise<BookEntity> {
    return {id: bookId};
  }

  @Query(() => UserRecordEntity)
  async record(
    @Args('id', {type: () => ID}) id: string,
  ): Promise<UserRecordEntity> {
    return this.recordsService.findById(id);
  }

  @Query(() => [UserRecordEntity])
  async allRecords(): Promise<UserRecordEntity[]> {
    return this.recordsService.findAll();
  }
}
