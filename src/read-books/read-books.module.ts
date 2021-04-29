import {Module} from '@nestjs/common';
import {PaginateModule} from '../paginate/paginate.module';
import {ReadBooksResolver} from './read-book.resolver';
import {ReadBooksService} from './read-books.service';
import {UsersResolver} from './users.resolver';

@Module({
  imports: [PaginateModule],
  providers: [ReadBooksService, UsersResolver, ReadBooksResolver],
  exports: [ReadBooksService],
})
export class ReadBooksModule {}
