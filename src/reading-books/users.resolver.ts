import {Args, Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {UserEntity} from '../users/users.entity';
import {
  UserReadingBooksArgs,
  UserReadingBooksReturnType,
} from './dto/resolve-user-reading-books.dto';
import {ReadingBooksService} from './reading-books.service';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: ReadingBooksService) {}

  @ResolveField(() => UserReadingBooksReturnType)
  async readingBooks(
    @Parent() {id: userId}: UserEntity,
    @Args({type: () => UserReadingBooksArgs})
    args: UserReadingBooksArgs,
  ): Promise<UserReadingBooksReturnType> {
    return this.usersService.getReadingBooks(userId, args);
  }
}
