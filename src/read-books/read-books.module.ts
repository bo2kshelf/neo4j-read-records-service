import {Module} from '@nestjs/common';
import {ReadBooksResolver} from './read-book.resolver';
import {ReadBooksService} from './read-books.service';
import {UsersResolver} from './users.resolver';

@Module({
  imports: [],
  providers: [ReadBooksService, UsersResolver, ReadBooksResolver],
  exports: [ReadBooksService],
})
export class ReadBooksModule {}
