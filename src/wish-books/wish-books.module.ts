import {Module} from '@nestjs/common';
import {UsersResolver} from './resolvers/users.resolver';
import {WishBookRecordsResolver} from './resolvers/wish-book-records.resolver';
import {UsersService} from './services/users.service';

@Module({
  imports: [],
  providers: [UsersService, UsersResolver, WishBookRecordsResolver],
  exports: [UsersService],
})
export class WishBooksModule {}
