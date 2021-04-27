import {Module} from '@nestjs/common';
import {ReadingBooksResolver} from './reading-books.resolver';
import {ReadingBooksService} from './reading-books.service';
import {UsersResolver} from './users.resolver';

@Module({
  imports: [],
  providers: [ReadingBooksService, UsersResolver, ReadingBooksResolver],
  exports: [ReadingBooksService],
})
export class ReadingBooksModule {}
