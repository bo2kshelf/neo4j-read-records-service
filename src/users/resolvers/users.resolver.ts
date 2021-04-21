import {Args, Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {UserEntity} from '../entities/users.entity';
import {UsersService} from '../services/users.service';
import {
  ResolveUsersHasBooksArgs,
  ResolveUsersHasBooksReturnEntity,
} from './dto/resolve-users-has-books.dto';
import {
  ResolveUsersReadingBooksArgs,
  ResolveUsersReadingBooksReturnEntity,
} from './dto/resolve-users-reading-books.dto';
import {
  ResolveUsersStackedBooksArgs,
  ResolveUsersStackedBooksReturnEntity,
} from './dto/resolve-users-stacked-books.dto';
import {
  ResolveUsersWishesReadBooksArgs,
  ResolveUsersWishesReadBooksReturnEntity,
} from './dto/resolve-users-wishes-read-books.dto';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @ResolveField(() => ResolveUsersReadingBooksReturnEntity)
  async readingBooks(
    @Parent() {id: userId}: UserEntity,
    @Args({type: () => ResolveUsersReadingBooksArgs})
    args: ResolveUsersReadingBooksArgs,
  ): Promise<ResolveUsersReadingBooksReturnEntity> {
    return this.usersService.getReadingBooks(userId, args);
  }

  @ResolveField(() => ResolveUsersHasBooksReturnEntity)
  async hasBooks(
    @Parent() {id: userId}: UserEntity,
    @Args({type: () => ResolveUsersHasBooksArgs})
    args: ResolveUsersHasBooksArgs,
  ): Promise<ResolveUsersHasBooksReturnEntity> {
    return this.usersService.getHaveBooks(userId, args);
  }

  @ResolveField(() => ResolveUsersWishesReadBooksReturnEntity)
  async wishesReadBooks(
    @Parent() {id: userId}: UserEntity,
    @Args({type: () => ResolveUsersWishesReadBooksArgs})
    args: ResolveUsersWishesReadBooksArgs,
  ): Promise<ResolveUsersWishesReadBooksReturnEntity> {
    return this.usersService.getWishesToReadBook(userId, args);
  }

  @ResolveField(() => ResolveUsersStackedBooksReturnEntity)
  async stackedBooks(
    @Parent() {id: userId}: UserEntity,
    @Args({type: () => ResolveUsersStackedBooksArgs})
    args: ResolveUsersStackedBooksArgs,
  ): Promise<ResolveUsersStackedBooksReturnEntity> {
    return this.usersService.getStackedBooks(userId, args);
  }
}
