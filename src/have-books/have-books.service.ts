import {Injectable} from '@nestjs/common';
import {int} from 'neo4j-driver';
import {OrderBy} from '../common/order-by.enum';
import {Neo4jService} from '../neo4j/neo4j.service';
import {UserHaveBookEntity} from './have-book.entities';

@Injectable()
export class HaveBooksService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async getHaveBooksFromUserId(
    userId: string,
    {skip, limit}: {skip: number; limit: number},
    {orderBy}: {orderBy: {updatedAt: OrderBy}},
  ): Promise<{entities: UserHaveBookEntity[]; meta: {count: number}}> {
    const entities: UserHaveBookEntity[] = await this.neo4jService
      .read(
        `
        MATCH (u:User {id: $userId})
        MATCH (u)-[r:HAS_BOOK]->(b:Book)
        RETURN u.id AS u, b.id AS b, r.updatedAt AS updatedAt
        ORDER BY r.updatedAt ${orderBy.updatedAt}
        SKIP $skip LIMIT $limit
        `,
        {userId, skip: int(skip), limit: int(limit)},
      )
      .then((result) =>
        result.records.map((record) => ({
          userId: record.get('u'),
          bookId: record.get('b'),
          updatedAt: new Date(record.get('updatedAt')),
        })),
      );
    const meta: {count: number} = await this.neo4jService
      .read(
        `
        MATCH p=(:User {id: $userId})-[r:HAS_BOOK]->()
        WITH count(p) AS count
        RETURN count, 0 < count AND 0 < $skip AS previous, $skip + $limit < count AS next
        `,
        {userId, skip: int(skip), limit: int(limit)},
      )
      .then((result) => ({
        count: result.records[0].get('count').toNumber(),
      }));
    return {entities, meta};
  }
}
