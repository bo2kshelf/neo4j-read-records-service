import {Module} from '@nestjs/common';
import {ReadBookRecordsResolver} from './resolvers/read-book.resolver';
import {UsersResolver} from './resolvers/users.resolver';
import {RecordsService} from './services/records.service';

@Module({
  imports: [],
  providers: [RecordsService, UsersResolver, ReadBookRecordsResolver],
  exports: [RecordsService],
})
export class ReadBooksModule {}
