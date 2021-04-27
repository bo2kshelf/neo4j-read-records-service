import {Args, Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {UserEntity} from '../../users/entities/users.entity';
import {UsersService} from '../services/users.service';
import {
  UserHaveBooksArgs,
  UserHaveBooksReturnType,
} from './dto/resolve-user-have-books.dto';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @ResolveField(() => UserHaveBooksReturnType)
  async haveBooks(
    @Parent() {id: userId}: UserEntity,
    @Args({type: () => UserHaveBooksArgs})
    args: UserHaveBooksArgs,
  ): Promise<UserHaveBooksReturnType> {
    return this.usersService.getHaveBooks(userId, args);
  }
}
