import {Args, Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {UserEntity} from '../users/users.entity';
import {
  UserWishBooksArgs,
  UserWishBooksReturnType,
} from './dto/resolve-user-wish-books.dto';
import {WishBooksService} from './wish-books.service';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: WishBooksService) {}

  @ResolveField(() => UserWishBooksReturnType)
  async wishBooks(
    @Parent() {id: userId}: UserEntity,
    @Args({type: () => UserWishBooksArgs})
    args: UserWishBooksArgs,
  ): Promise<UserWishBooksReturnType> {
    return this.usersService.getWishesToReadBook(userId, args);
  }
}
