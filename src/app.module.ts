import {Module} from '@nestjs/common';
import {ConfigModule, ConfigType} from '@nestjs/config';
import {GraphQLFederationModule} from '@nestjs/graphql';
import {HaveBooksModule} from './have-books/have-books.module';
import {Neo4jConfig} from './neo4j/neo4j.config';
import {Neo4jModule} from './neo4j/neo4j.module';
import {ReadingBooksModule} from './reading-books/reading-books.module';
import {RecordsModule} from './records/records.module';
import {StackedBooksModule} from './stacked-books/stacked-books.module';
import {WishBooksModule} from './wish-books/wish-books.module';

@Module({
  imports: [
    GraphQLFederationModule.forRoot({
      autoSchemaFile: true,
    }),
    Neo4jModule.forRootAsync({
      imports: [ConfigModule.forFeature(Neo4jConfig)],
      inject: [Neo4jConfig.KEY],
      useFactory: async (config: ConfigType<typeof Neo4jConfig>) => ({
        url: config.url,
        username: config.username,
        password: config.password,
      }),
    }),
    HaveBooksModule,
    ReadingBooksModule,
    StackedBooksModule,
    WishBooksModule,
    RecordsModule,
  ],
})
export class AppModule {}
