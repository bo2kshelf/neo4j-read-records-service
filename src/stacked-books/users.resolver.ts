import {Args, Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {PaginateService} from '../paginate/paginate.service';
import {UserEntity} from '../users/users.entity';
import {UserStackedBooksArgs} from './dto/resolve-user-stacked-books.dto';
import {UserStackedBookConnection} from './stacked-book.entity';
import {StackedBooksService} from './stacked-books.service';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(
    private readonly usersService: StackedBooksService,
    private readonly paginate: PaginateService,
  ) {}

  @ResolveField(() => UserStackedBookConnection)
  async stackedBooks(
    @Parent() {id: userId}: UserEntity,
    @Args({type: () => UserStackedBooksArgs})
    {orderBy, ...props}: UserStackedBooksArgs,
  ): Promise<UserStackedBookConnection> {
    const params = this.paginate.transformArgsToParameter(props);
    const {
      entities,
      meta,
    } = await this.usersService.getStackedBooksFromUserId(
      userId,
      this.paginate.getSkipAndLimit(params),
      {orderBy},
    );
    return this.paginate.transformToConnection(entities, params, meta);
  }
}
