import {Module} from '@nestjs/common';
import {StackedBookRecordsResolver} from './resolvers/stacked-book-records.resolver';
import {UsersResolver} from './resolvers/users.resolver';
import {UsersService} from './services/users.service';

@Module({
  imports: [],
  providers: [UsersService, UsersResolver, StackedBookRecordsResolver],
  exports: [UsersService],
})
export class StackedBooksModule {}
