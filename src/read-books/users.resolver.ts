import {Args, Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {PaginateService} from '../paginate/paginate.service';
import {UserEntity} from '../users/users.entity';
import {UserReadBooksArgs} from './dto/resolve-user-read-books.dto';
import {UserReadBookConnection} from './read-book.entity';
import {ReadBooksService} from './read-books.service';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(
    private readonly usersService: ReadBooksService,
    private readonly paginate: PaginateService,
  ) {}

  @ResolveField(() => UserReadBookConnection)
  async readBooks(
    @Parent() {id: userId}: UserEntity,
    @Args({type: () => UserReadBooksArgs})
    {orderBy, ...props}: UserReadBooksArgs,
  ): Promise<UserReadBookConnection> {
    const params = this.paginate.transformArgsToParameter(props);
    const {
      entities,
      meta,
    } = await this.usersService.getReadBooksFromUser(
      userId,
      this.paginate.getSkipAndLimit(params),
      {orderBy},
    );
    return this.paginate.transformToConnection(entities, params, meta);
  }
}
