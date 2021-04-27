import {Args, Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {UserEntity} from '../../users/entities/users.entity';
import {UsersService} from '../services/users.service';
import {
  UserStackedBooksArgs,
  UserStackedBooksReturnType,
} from './dto/resolve-user-stacked-books.dto';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @ResolveField(() => UserStackedBooksReturnType)
  async stackedBooks(
    @Parent() {id: userId}: UserEntity,
    @Args({type: () => UserStackedBooksArgs})
    args: UserStackedBooksArgs,
  ): Promise<UserStackedBooksReturnType> {
    return this.usersService.getStackedBooks(userId, args);
  }
}
