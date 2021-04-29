import {Args, Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {PaginateService} from '../paginate/paginate.service';
import {UserEntity} from '../users/users.entity';
import {UserReadingBooksArgs} from './dto/resolve-user-reading-books.dto';
import {UserReadingBookConnection} from './reading-book.entities';
import {ReadingBooksService} from './reading-books.service';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(
    private readonly usersService: ReadingBooksService,
    private readonly paginate: PaginateService,
  ) {}

  @ResolveField(() => UserReadingBookConnection)
  async readingBooks(
    @Parent() {id: userId}: UserEntity,
    @Args({type: () => UserReadingBooksArgs})
    {orderBy, ...props}: UserReadingBooksArgs,
  ): Promise<UserReadingBookConnection> {
    const params = this.paginate.transformArgsToParameter(props);
    const offset = this.paginate.getSkipAndLimit(params);
    const {entities, meta} = await this.usersService.getReadingBooksFromUserId(
      userId,
      offset,
      {
        orderBy,
      },
    );
    return this.paginate.transformToConnection(entities, params, meta, offset);
  }
}
