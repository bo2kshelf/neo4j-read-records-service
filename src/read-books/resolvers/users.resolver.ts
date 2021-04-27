import {Args, Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {UserEntity} from '../../users/entities/users.entity';
import {RecordsService} from '../services/records.service';
import {
  UserReadBooksArgs,
  UserReadBooksReturnType,
} from './dto/resolve-user-read-books.dto';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: RecordsService) {}

  @ResolveField(() => UserReadBooksReturnType)
  async readBooks(
    @Parent() {id: userId}: UserEntity,
    @Args({type: () => UserReadBooksArgs})
    args: UserReadBooksArgs,
  ): Promise<UserReadBooksReturnType> {
    return this.usersService.getReadBooksFromUser(userId, args);
  }
}
