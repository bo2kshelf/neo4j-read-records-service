import {Module} from '@nestjs/common';
import {ReadingBookRecordsResolver} from './resolvers/reading-book-records.resolver';
import {UsersResolver} from './resolvers/users.resolver';
import {UsersService} from './services/users.service';

@Module({
  imports: [],
  providers: [UsersService, UsersResolver, ReadingBookRecordsResolver],
  exports: [UsersService],
})
export class ReadingBooksModule {}
