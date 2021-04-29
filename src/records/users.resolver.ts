import {Args, Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {PaginateService} from '../paginate/paginate.service';
import {UserEntity} from '../users/users.entity';
import {UserRecordsArgs} from './dto/resolve-user-records.dto';
import {UserRecordConnection} from './record.entities';
import {RecordsService} from './records.service';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(
    private readonly recordsService: RecordsService,
    private readonly paginate: PaginateService,
  ) {}

  @ResolveField(() => UserRecordConnection)
  async records(
    @Parent() {id: userId}: UserEntity,
    @Args({type: () => UserRecordsArgs})
    {orderBy, ...props}: UserRecordsArgs,
  ): Promise<UserRecordConnection> {
    const params = this.paginate.transformArgsToParameter(props);
    const {
      entities,
      meta,
    } = await this.recordsService.getRecordsFromUser(
      userId,
      this.paginate.getSkipAndLimit(params),
      {orderBy},
    );
    return this.paginate.transformToConnection(entities, params, meta);
  }
}
