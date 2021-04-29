import {Module} from '@nestjs/common';
import {PaginateModule} from '../paginate/paginate.module';
import {HaveBooksResolver} from './have-books.resolver';
import {HaveBooksService} from './have-books.service';
import {UsersResolver} from './users.resolver';

@Module({
  imports: [PaginateModule],
  providers: [HaveBooksService, UsersResolver, HaveBooksResolver],
  exports: [HaveBooksService],
})
export class HaveBooksModule {}
