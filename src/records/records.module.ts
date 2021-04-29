import {Module} from '@nestjs/common';
import {PaginateModule} from '../paginate/paginate.module';
import {RecordsResolver} from './records.resolver';
import {RecordsService} from './records.service';
import {UsersResolver} from './users.resolver';

@Module({
  imports: [PaginateModule],
  providers: [RecordsService, RecordsResolver, UsersResolver],
  exports: [RecordsService],
})
export class RecordsModule {}
