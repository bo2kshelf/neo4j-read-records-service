import {INestApplication} from '@nestjs/common';
import {Test} from '@nestjs/testing';
import {OrderBy} from '../../../common/order-by.enum';
import {Neo4jTestModule} from '../../../neo4j/neo4j-test.module';
import {Neo4jService} from '../../../neo4j/neo4j.service';
import {WishBooksService} from '../../wish-books.service';

describe(WishBooksService.name, () => {
  let app: INestApplication;

  let neo4jService: Neo4jService;

  let usersService: WishBooksService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [Neo4jTestModule],
      providers: [WishBooksService],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    neo4jService = module.get<Neo4jService>(Neo4jService);

    usersService = module.get<WishBooksService>(WishBooksService);
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

  describe('getWishBooksFromUserId()', () => {
    describe('一般的な場合', () => {
      beforeEach(async () => {
        await neo4jService.write(
          `
          CREATE (u:User {id: "user1"})
          CREATE (b1:Book {id: "book1"})
          CREATE (b2:Book {id: "book2"})
          CREATE (b3:Book {id: "book3"})
          CREATE (u)-[r1:WISHES_TO_READ_BOOK {updateAt: "2020-01-01T00:00:00.0000000Z"}]->(b1)
          CREATE (u)-[r2:WISHES_TO_READ_BOOK {updateAt: "2020-01-02T00:00:00.0000000Z"}]->(b2)
          CREATE (u)-[r3:WISHES_TO_READ_BOOK {updateAt: "2020-01-03T00:00:00.0000000Z"}]->(b3)
          RETURN *
          `,
        );
      });

      it.each([
        [
          {skip: 0, limit: 0},
          {orderBy: {updatedAt: OrderBy.ASC}},
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
                bookId: 'book3',
                updatedAt: expect.any(Date),
              },
              {
                userId: 'user1',
                bookId: 'book2',
                updatedAt: expect.any(Date),
              },
              {
                userId: 'user1',
                bookId: 'book1',
                updatedAt: expect.any(Date),
              },
            ],
            meta: {count: 3},
          },
        ],
        [
          {skip: 0, limit: 6},
          {orderBy: {updatedAt: OrderBy.ASC}},
          {
            entities: [
              {
                userId: 'user1',
                bookId: 'book3',
                updatedAt: expect.any(Date),
              },
              {
                userId: 'user1',
                bookId: 'book2',
                updatedAt: expect.any(Date),
              },
              {
                userId: 'user1',
                bookId: 'book1',
                updatedAt: expect.any(Date),
              },
            ],
            meta: {count: 3},
          },
        ],
        [
          {skip: 0, limit: 1},
          {orderBy: {updatedAt: OrderBy.ASC}},
          {
            entities: [
              {
                userId: 'user1',
                bookId: 'book3',
                updatedAt: expect.any(Date),
              },
            ],
            meta: {count: 3},
          },
        ],
        [
          {skip: 3, limit: 3},
          {orderBy: {updatedAt: OrderBy.ASC}},
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
                updatedAt: expect.any(Date),
              },
              {
                userId: 'user1',
                bookId: 'book2',
                updatedAt: expect.any(Date),
              },
              {
                userId: 'user1',
                bookId: 'book1',
                updatedAt: expect.any(Date),
              },
            ],
            meta: {count: 3},
          },
        ],
      ])('正常な動作 %j %j', async (offset, params, expected) => {
        const actual = await usersService.getWishBooksFromUserId(
          'user1',
          offset,
          params,
        );

        expect(actual).toStrictEqual(expected);
      });
    });
  });
});
