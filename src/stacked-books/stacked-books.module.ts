import {Module} from '@nestjs/common';
import {StackedBooksResolver} from './stacked-books.resolver';
import {StackedBooksService} from './stacked-books.service';
import {UsersResolver} from './users.resolver';

@Module({
  imports: [],
  providers: [StackedBooksService, UsersResolver, StackedBooksResolver],
  exports: [StackedBooksService],
})
export class StackedBooksModule {}
