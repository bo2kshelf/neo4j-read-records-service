import {Args, Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {PaginateService} from '../paginate/paginate.service';
import {UserEntity} from '../users/users.entity';
import {UserWishBooksArgs} from './dto/resolve-user-wish-books.dto';
import {UserWishBooksConnection} from './wish-book.entity';
import {WishBooksService} from './wish-books.service';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(
    private readonly usersService: WishBooksService,
    private readonly paginate: PaginateService,
  ) {}

  @ResolveField(() => UserWishBooksConnection)
  async wishBooks(
    @Parent() {id: userId}: UserEntity,
    @Args({type: () => UserWishBooksArgs})
    {orderBy, ...props}: UserWishBooksArgs,
  ): Promise<UserWishBooksConnection> {
    const params = this.paginate.transformArgsToParameter(props);
    const {
      entities,
      meta,
    } = await this.usersService.getWishBooksFromUserId(
      userId,
      this.paginate.getSkipAndLimit(params),
      {orderBy},
    );
    return this.paginate.transformToConnection(entities, params, meta);
  }
}
