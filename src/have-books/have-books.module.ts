import {Module} from '@nestjs/common';
import {HaveBookRecordsResolver} from './resolvers/have-book-records.resolver';
import {UsersResolver} from './resolvers/users.resolver';
import {UsersService} from './services/users.service';

@Module({
  imports: [],
  providers: [UsersService, UsersResolver, HaveBookRecordsResolver],
  exports: [UsersService],
})
export class HaveBooksModule {}
