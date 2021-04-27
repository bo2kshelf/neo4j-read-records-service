import {Module} from '@nestjs/common';
import {UsersResolver} from './users.resolver';
import {WishBooksResolver} from './wish-books.resolver';
import {WishBooksService} from './wish-books.service';

@Module({
  imports: [],
  providers: [WishBooksService, UsersResolver, WishBooksResolver],
  exports: [WishBooksService],
})
export class WishBooksModule {}
