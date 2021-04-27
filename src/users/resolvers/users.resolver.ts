import {Args, Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {UserEntity} from '../entities/users.entity';
import {UsersService} from '../services/users.service';
import {
  UserHaveBooksArgs,
  UserHaveBooksReturnType,
} from './dto/resolve-user-have-books.dto';
import {
  UserReadingBooksArgs,
  UserReadingBooksReturnType,
} from './dto/resolve-user-reading-books.dto';
import {
  UserStackedBooksArgs,
  UserStackedBooksReturnType,
} from './dto/resolve-user-stacked-books.dto';
import {
  UserWishBooksArgs,
  UserWishBooksReturnType,
} from './dto/resolve-user-wish-books.dto';

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

  @ResolveField(() => UserHaveBooksReturnType)
  async haveBooks(
    @Parent() {id: userId}: UserEntity,
    @Args({type: () => UserHaveBooksArgs})
    args: UserHaveBooksArgs,
  ): Promise<UserHaveBooksReturnType> {
    return this.usersService.getHaveBooks(userId, args);
  }

  @ResolveField(() => UserWishBooksReturnType)
  async wishBooks(
    @Parent() {id: userId}: UserEntity,
    @Args({type: () => UserWishBooksArgs})
    args: UserWishBooksArgs,
  ): Promise<UserWishBooksReturnType> {
    return this.usersService.getWishesToReadBook(userId, args);
  }

  @ResolveField(() => UserStackedBooksReturnType)
  async stackedBooks(
    @Parent() {id: userId}: UserEntity,
    @Args({type: () => UserStackedBooksArgs})
    args: UserStackedBooksArgs,
  ): Promise<UserStackedBooksReturnType> {
    return this.usersService.getStackedBooks(userId, args);
  }
}
