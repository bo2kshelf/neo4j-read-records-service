import {Args, Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {UserEntity} from '../users/users.entity';
import {
  UserHaveBooksArgs,
  UserHaveBooksReturnType,
} from './dto/resolve-user-have-books.dto';
import {HaveBooksService} from './have-books.service';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: HaveBooksService) {}

  @ResolveField(() => UserHaveBooksReturnType)
  async haveBooks(
    @Parent() {id: userId}: UserEntity,
    @Args({type: () => UserHaveBooksArgs})
    args: UserHaveBooksArgs,
  ): Promise<UserHaveBooksReturnType> {
    return this.usersService.getHaveBooks(userId, args);
  }
}
