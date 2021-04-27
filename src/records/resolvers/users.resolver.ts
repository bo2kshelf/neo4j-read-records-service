import {Args, Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {UserEntity} from '../../users/entities/users.entity';
import {RecordsService} from '../services/records.service';
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
}
