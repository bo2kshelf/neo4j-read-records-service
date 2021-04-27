import {Args, Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {UserEntity} from '../users/users.entity';
import {
  UserStackedBooksArgs,
  UserStackedBooksReturnType,
} from './dto/resolve-user-stacked-books.dto';
import {StackedBooksService} from './stacked-books.service';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: StackedBooksService) {}

  @ResolveField(() => UserStackedBooksReturnType)
  async stackedBooks(
    @Parent() {id: userId}: UserEntity,
    @Args({type: () => UserStackedBooksArgs})
    args: UserStackedBooksArgs,
  ): Promise<UserStackedBooksReturnType> {
    return this.usersService.getStackedBooks(userId, args);
  }
}
