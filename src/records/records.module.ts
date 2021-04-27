import {Module} from '@nestjs/common';
import {ReadBookRecordResolver} from './resolvers/read-book.resolver';
import {RecordResolver} from './resolvers/records.resolver';
import {UsersResolver} from './resolvers/users.resolver';
import {RecordsService} from './services/records.service';

@Module({
  imports: [],
  providers: [
    RecordsService,
    RecordResolver,
    ReadBookRecordResolver,
    UsersResolver,
  ],
})
export class RecordsModule {}
