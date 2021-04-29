import {Injectable} from '@nestjs/common';
import {int} from 'neo4j-driver';
import {OrderBy} from '../common/order-by.enum';
import {Neo4jService} from '../neo4j/neo4j.service';
import {UserReadBookEntity} from './read-book.entities';

@Injectable()
export class ReadBooksService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async getReadBooksFromUser(
    userId: string,
    {skip, limit}: {skip: number; limit: number},
    {orderBy}: {orderBy: {title: OrderBy}},
  ): Promise<{entities: UserReadBookEntity[]; meta: {count: number}}> {
    const entities: UserReadBookEntity[] = await this.neo4jService
      .read(
        `
        MATCH (u:User {id: $userId})
        MATCH (u)-[:RECORDED]->(:Record)-[:RECORD_OF]->(b:Book)
        WITH DISTINCT b, u
        ORDER BY b.title ${orderBy.title}
        SKIP $skip LIMIT $limit
        RETURN b.id AS b, u.id AS u
        `,
        {userId, skip: int(skip), limit: int(limit)},
      )
      .then((result) =>
        result.records.map((record) => ({
          userId: record.get('u'),
          bookId: record.get('b'),
        })),
      );
    const meta: {count: number} = await this.neo4jService
      .read(
        `
        MATCH (:User {id: $userId})-[:RECORDED]->(:Record)-[:RECORD_OF]->(b)
        WITH DISTINCT b
        RETURN count(b) AS count
        `,
        {userId, skip: int(skip), limit: int(limit)},
      )
      .then((result) => ({
        count: result.records[0].get('count').toNumber(),
      }));
    return {entities, meta};
  }
}
