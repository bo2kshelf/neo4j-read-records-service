import {INestApplication} from '@nestjs/common';
import {Test} from '@nestjs/testing';
import {OrderBy} from '../../../common/order-by.enum';
import {Neo4jTestModule} from '../../../neo4j/neo4j-test.module';
import {Neo4jService} from '../../../neo4j/neo4j.service';
import {HaveBooksService} from '../../have-books.service';

describe(HaveBooksService.name, () => {
  let app: INestApplication;

  let neo4jService: Neo4jService;

  let usersService: HaveBooksService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [Neo4jTestModule],
      providers: [HaveBooksService],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    neo4jService = module.get<Neo4jService>(Neo4jService);

    usersService = module.get<HaveBooksService>(HaveBooksService);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    await neo4jService.write(`MATCH (n) DETACH DELETE n`);
  });

  afterAll(async () => {
    await app.close();
  });

  it('to be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('getHaveBooksFromUserId()', () => {
    describe('一般的な場合', () => {
      beforeEach(async () => {
        await neo4jService.write(
          `
          CREATE (u:User {id: "user1"})
          CREATE (b1:Book {id: "book1"})
          CREATE (b2:Book {id: "book2"})
          CREATE (b3:Book {id: "book3"})
          CREATE (u)-[r1:HAS_BOOK {updatedAt: datetime("2000-01-01T00:00:00.000Z")}]->(b1)
          CREATE (u)-[r2:HAS_BOOK {updatedAt: datetime("2000-01-02T00:00:00.000Z")}]->(b2)
          CREATE (u)-[r3:HAS_BOOK {updatedAt: datetime("2000-01-03T00:00:00.000Z")}]->(b3)
          RETURN *
          `,
        );
      });

      it.each([
        [
          {skip: 0, limit: 0},
          {orderBy: {updatedAt: OrderBy.DESC}},
          {
            entities: [],
            meta: {count: 3},
          },
        ],
        [
          {skip: 0, limit: 3},
          {orderBy: {updatedAt: OrderBy.DESC}},
          {
            entities: [
              {
                userId: 'user1',
                bookId: 'book3',
                updatedAt: new Date('2000-01-03T00:00:00.000Z'),
              },
              {
                userId: 'user1',
                bookId: 'book2',
                updatedAt: new Date('2000-01-02T00:00:00.000Z'),
              },
              {
                userId: 'user1',
                bookId: 'book1',
                updatedAt: new Date('2000-01-01T00:00:00.000Z'),
              },
            ],
            meta: {count: 3},
          },
        ],
        [
          {skip: 0, limit: 6},
          {orderBy: {updatedAt: OrderBy.DESC}},
          {
            entities: [
              {
                userId: 'user1',
                bookId: 'book3',
                updatedAt: new Date('2000-01-03T00:00:00.000Z'),
              },
              {
                userId: 'user1',
                bookId: 'book2',
                updatedAt: new Date('2000-01-02T00:00:00.000Z'),
              },
              {
                userId: 'user1',
                bookId: 'book1',
                updatedAt: new Date('2000-01-01T00:00:00.000Z'),
              },
            ],
            meta: {count: 3},
          },
        ],
        [
          {skip: 0, limit: 1},
          {orderBy: {updatedAt: OrderBy.DESC}},
          {
            entities: [
              {
                userId: 'user1',
                bookId: 'book3',
                updatedAt: new Date('2000-01-03T00:00:00.000Z'),
              },
            ],
            meta: {count: 3},
          },
        ],
        [
          {skip: 3, limit: 3},
          {orderBy: {updatedAt: OrderBy.DESC}},
          {
            entities: [],
            meta: {count: 3},
          },
        ],
        [
          {skip: 0, limit: 3},
          {orderBy: {updatedAt: OrderBy.ASC}},
          {
            entities: [
              {
                userId: 'user1',
                bookId: 'book1',
                updatedAt: new Date('2000-01-01T00:00:00.000Z'),
              },
              {
                userId: 'user1',
                bookId: 'book2',
                updatedAt: new Date('2000-01-02T00:00:00.000Z'),
              },
              {
                userId: 'user1',
                bookId: 'book3',
                updatedAt: new Date('2000-01-03T00:00:00.000Z'),
              },
            ],
            meta: {count: 3},
          },
        ],
      ])('正常な動作 %j', async (offset, params, expected) => {
        const actual = await usersService.getHaveBooksFromUserId(
          'user1',
          offset,
          params,
        );

        expect(actual).toStrictEqual(expected);
      });
    });
  });
});
