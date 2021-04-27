import {Args, ID, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {BookEntity} from '../books/entities/book.entity';
import {UserEntity} from '../users/users.entity';
import {RecordEntity} from './record.entity';
import {RecordsService} from './records.service';

@Resolver(() => RecordEntity)
export class RecordsResolver {
  constructor(private readonly recordsService: RecordsService) {}

  @ResolveField(() => UserEntity)
  async user(@Parent() {userId}: RecordEntity): Promise<UserEntity> {
    return {id: userId};
  }

  @ResolveField(() => BookEntity)
  async book(@Parent() {bookId}: RecordEntity): Promise<BookEntity> {
    return {id: bookId};
  }

  @Query(() => RecordEntity)
  async record(
    @Args('id', {type: () => ID}) id: string,
  ): Promise<RecordEntity> {
    return this.recordsService.findById(id);
  }

  @Query(() => [RecordEntity])
  async allRecords(): Promise<RecordEntity[]> {
    return this.recordsService.findAll();
  }
}
