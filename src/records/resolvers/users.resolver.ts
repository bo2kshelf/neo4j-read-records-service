import {Args, Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {UserEntity} from '../../users/entities/users.entity';
import {RecordsService} from '../services/records.service';
import {
  UserReadBooksArgs,
  UserReadBooksReturnType,
} from './dto/resolve-user-read-books.dto';
import {
  UserRecordsArgs,
  UserRecordsReturnType,
} from './dto/resolve-user-records.dto';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly recordsService: RecordsService) {}

  @ResolveField(() => UserRecordsReturnType)
  async records(
    @Parent() {id: userId}: UserEntity,
    @Args({type: () => UserRecordsArgs})
    args: UserRecordsArgs,
  ): Promise<UserRecordsReturnType> {
    return this.recordsService.getRecordsFromUser(userId, args);
  }

  @ResolveField(() => UserReadBooksReturnType)
  async readBooks(
    @Parent() {id: userId}: UserEntity,
    @Args({type: () => UserReadBooksArgs})
    args: UserReadBooksArgs,
  ): Promise<UserReadBooksReturnType> {
    return this.recordsService.getReadBooksFromUser(userId, args);
  }
}
