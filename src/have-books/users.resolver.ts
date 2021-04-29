import {Args, Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {PaginateService} from '../paginate/paginate.service';
import {UserEntity} from '../users/users.entity';
import {UserHaveBooksArgs} from './dto/resolve-user-have-books.dto';
import {UserHaveBookConnection} from './have-book.entities';
import {HaveBooksService} from './have-books.service';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(
    private readonly usersService: HaveBooksService,
    private readonly paginate: PaginateService,
  ) {}

  @ResolveField(() => UserHaveBookConnection)
  async haveBooks(
    @Parent() {id: userId}: UserEntity,
    @Args({type: () => UserHaveBooksArgs})
    {orderBy, ...props}: UserHaveBooksArgs,
  ): Promise<UserHaveBookConnection> {
    const params = this.paginate.transformArgsToParameter(props);
    const {
      entities,
      meta,
    } = await this.usersService.getHaveBooksFromUserId(
      userId,
      this.paginate.getSkipAndLimit(params),
      {orderBy},
    );
    return this.paginate.transformToConnection(entities, params, meta);
  }
}
