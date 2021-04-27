import {Args, Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {UserEntity} from '../../users/entities/users.entity';
import {UsersService} from '../services/users.service';
import {
  UserWishBooksArgs,
  UserWishBooksReturnType,
} from './dto/resolve-user-wish-books.dto';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @ResolveField(() => UserWishBooksReturnType)
  async wishBooks(
    @Parent() {id: userId}: UserEntity,
    @Args({type: () => UserWishBooksArgs})
    args: UserWishBooksArgs,
  ): Promise<UserWishBooksReturnType> {
    return this.usersService.getWishesToReadBook(userId, args);
  }
}
