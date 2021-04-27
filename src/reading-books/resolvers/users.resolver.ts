import {Args, Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {UserEntity} from '../../users/entities/users.entity';
import {UsersService} from '../services/users.service';
import {
  UserReadingBooksArgs,
  UserReadingBooksReturnType,
} from './dto/resolve-user-reading-books.dto';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @ResolveField(() => UserReadingBooksReturnType)
  async readingBooks(
    @Parent() {id: userId}: UserEntity,
    @Args({type: () => UserReadingBooksArgs})
    args: UserReadingBooksArgs,
  ): Promise<UserReadingBooksReturnType> {
    return this.usersService.getReadingBooks(userId, args);
  }
}
