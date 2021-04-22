import {Module} from '@nestjs/common';
import {IDModule} from '../common/id/id.module';
import {UsersModule} from '../users/users.module';
import {ReadBookRecordResolver} from './resolvers/read-book.resolver';
import {RecordResolver} from './resolvers/records.resolver';
import {UsersResolver} from './resolvers/users.resolver';
import {RecordsService} from './services/records.service';

@Module({
  imports: [IDModule, UsersModule],
  providers: [
    RecordsService,
    RecordResolver,
    ReadBookRecordResolver,
    UsersResolver,
  ],
})
export class RecordsModule {}
