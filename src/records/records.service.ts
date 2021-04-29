import {Injectable} from '@nestjs/common';
import {int} from 'neo4j-driver';
import {OrderBy} from '../common/order-by.enum';
import {Neo4jService} from '../neo4j/neo4j.service';
import {UserRecordEntity} from './record.entities';

@Injectable()
export class RecordsService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async findById(id: string): Promise<UserRecordEntity> {
    const result = await this.neo4jService.read(
      `
      MATCH (r:Record {id: $id})
      MATCH (u:User)-[:RECORDED]->(r)-[:RECORD_OF]->(b:Book)
      RETURN r.id AS id, toString(r.readAt) AS readAt, u.id AS userId, b.id AS bookId
      `,
      {id},
    );
    if (result.records.length === 0) throw new Error('Not Found');
    return {
      id: result.records[0].get('id'),
      readAt: result.records[0].get('readAt'),
      userId: result.records[0].get('userId'),
      bookId: result.records[0].get('bookId'),
    };
  }

  async findAll(): Promise<UserRecordEntity[]> {
    return this.neo4jService
      .read(
        `
        MATCH (r:Record)
        MATCH (u:User)-[:RECORDED]->(r)-[:RECORD_OF]->(b:Book)
        RETURN r.id AS id, toString(r.readAt) AS readAt, u.id AS userId, b.id AS bookId
        `,
      )
      .then((res) =>
        res.records.map((record) => ({
          id: record.get('id'),
          readAt: record.get('readAt'),
          userId: record.get('userId'),
          bookId: record.get('bookId'),
        })),
      );
  }

  async getRecordsFromUserId(
    userId: string,
    {skip, limit}: {skip: number; limit: number},
    {orderBy}: {orderBy: {readAt: OrderBy}},
  ): Promise<{entities: UserRecordEntity[]; meta: {count: number}}> {
    const entities: UserRecordEntity[] = await this.neo4jService
      .read(
        `
      MATCH (u:User {id: $userId})
      CALL {
          MATCH (u)-[:RECORDED]->(r:Record)
          WHERE r.readAt IS NOT NULL
          RETURN r
          ORDER BY r.readAt ${orderBy.readAt}
          UNION
          MATCH (u)-[:RECORDED]->(r:Record)
          WHERE r.readAt IS NULL
          RETURN r
      }
      MATCH (u)-[:RECORDED]->(r)-[:RECORD_OF]->(b:Book)
      RETURN r.id AS id, u.id AS u, b.id AS b, toString(r.readAt) AS readAt
      SKIP $skip LIMIT $limit
    `,
        {userId, skip: int(skip), limit: int(limit)},
      )
      .then((result) =>
        result.records.map((record) => ({
          id: record.get('id'),
          bookId: record.get('b'),
          userId: record.get('u'),
          readAt: record.get('readAt'),
        })),
      );
    const meta: {count: number} = await this.neo4jService
      .read(
        `
      MATCH p=(:User {id: $userId})-[:RECORDED]->(:Record)
      RETURN count(p) AS count
    `,
        {userId, skip: int(skip), limit: int(limit)},
      )
      .then((result) => ({
        count: result.records[0].get('count').toNumber(),
      }));
    return {entities, meta};
  }
}
