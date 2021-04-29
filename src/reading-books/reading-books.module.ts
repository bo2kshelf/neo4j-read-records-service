import {Module} from '@nestjs/common';
import {PaginateModule} from '../paginate/paginate.module';
import {ReadingBooksResolver} from './reading-books.resolver';
import {ReadingBooksService} from './reading-books.service';
import {UsersResolver} from './users.resolver';

@Module({
  imports: [PaginateModule],
  providers: [ReadingBooksService, UsersResolver, ReadingBooksResolver],
  exports: [ReadingBooksService],
})
export class ReadingBooksModule {}
