import {Args, Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {UserEntity} from '../users/users.entity';
import {
  UserReadBooksArgs,
  UserReadBooksReturnType,
} from './dto/resolve-user-read-books.dto';
import {ReadBooksService} from './read-books.service';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: ReadBooksService) {}

  @ResolveField(() => UserReadBooksReturnType)
  async readBooks(
    @Parent() {id: userId}: UserEntity,
    @Args({type: () => UserReadBooksArgs})
    args: UserReadBooksArgs,
  ): Promise<UserReadBooksReturnType> {
    return this.usersService.getReadBooksFromUser(userId, args);
  }
}
