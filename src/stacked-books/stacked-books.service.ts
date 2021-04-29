import {Injectable} from '@nestjs/common';
import {int} from 'neo4j-driver';
import {OrderBy} from '../common/order-by.enum';
import {Neo4jService} from '../neo4j/neo4j.service';
import {UserStackedBookEntity} from './stacked-book.entity';

@Injectable()
export class StackedBooksService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async getStackedBooksFromUserId(
    userId: string,
    {skip, limit}: {skip: number; limit: number},
    {orderBy}: {orderBy: {updatedAt: OrderBy}},
  ): Promise<{entities: UserStackedBookEntity[]; meta: {count: number}}> {
    const entities: UserStackedBookEntity[] = await this.neo4jService
      .read(
        `
        MATCH (u:User {id: $userId})
        MATCH p = (u)-[r:HAS_BOOK]->(b)
        WHERE NOT EXISTS ((u)-[:RECORDED]->(:Record)-[:RECORD_OF]->(b))
        RETURN u,b
        ORDER BY r.updatedAt ${orderBy.updatedAt}
        SKIP $skip LIMIT $limit
        `,
        {userId, skip: int(skip), limit: int(limit)},
      )
      .then((result) =>
        result.records.map((record) => ({
          userId: record.get('u').properties.id,
          bookId: record.get('b').properties.id,
        })),
      );
    const meta: {count: number} = await this.neo4jService
      .read(
        `
        MATCH (u:User {id: $userId})
        MATCH p = (u)-[:HAS_BOOK]->(b)
        WHERE NOT EXISTS ((u)-[:RECORDED]->(:Record)-[:RECORD_OF]->(b))
        RETURN count(p) AS count
      `,
        {userId, skip: int(skip), limit: int(limit)},
      )
      .then((result) => ({count: result.records[0].get('count').toNumber()}));
    return {
      entities,
      meta,
    };
  }
}
