import {Module} from '@nestjs/common';
import {HaveBookRecordsResolver} from './resolvers/have-book-records.resolver';
import {ReadingBookRecordsResolver} from './resolvers/reading-book-records.resolver';
import {StackedBookRecordsResolver} from './resolvers/stacked-book-records.resolver';
import {WishBookRecordsResolver} from './resolvers/wish-book-records.resolver';
import {UsersModule} from './users.module';

@Module({
  imports: [UsersModule],
  providers: [
    HaveBookRecordsResolver,
    ReadingBookRecordsResolver,
    StackedBookRecordsResolver,
    WishBookRecordsResolver,
  ],
})
export class UserRecordsModule {}
