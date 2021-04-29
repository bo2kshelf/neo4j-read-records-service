import {Module} from '@nestjs/common';
import {PaginateModule} from '../paginate/paginate.module';
import {StackedBooksResolver} from './stacked-books.resolver';
import {StackedBooksService} from './stacked-books.service';
import {UsersResolver} from './users.resolver';

@Module({
  imports: [PaginateModule],
  providers: [StackedBooksService, UsersResolver, StackedBooksResolver],
  exports: [StackedBooksService],
})
export class StackedBooksModule {}
