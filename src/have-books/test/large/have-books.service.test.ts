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

  describe('getHaveBooks()', () => {
    describe('一般的な場合', () => {
      const expectedUser = {id: 'user1'};
      const expectedBooks = [{id: 'book1'}, {id: 'book2'}, {id: 'book3'}];
      const expectedRecords = [
        {
          userId: expectedUser.id,
          bookId: expectedBooks[0].id,
          updatedAt: '2020-01-01T00:00:00.000000000Z',
          have: true,
        },
        {
          userId: expectedUser.id,
          bookId: expectedBooks[1].id,
          updatedAt: '2020-01-02T00:00:00.000000000Z',
          have: true,
        },
        {
          userId: expectedUser.id,
          bookId: expectedBooks[2].id,
          updatedAt: '2020-01-03T00:00:00.000000000Z',
          have: true,
        },
      ];

      beforeEach(async () => {
        await Promise.all(
          expectedRecords.map(({userId, bookId, ...props}) =>
            neo4jService.write(
              `
                MERGE (u:User {id: $userId})-[r:HAS_BOOK]->(b:Book {id: $bookId})
                SET r=$props
                RETURN *
                `,
              {userId, bookId, props},
            ),
          ),
        );
      });

      it.each([
        [
          {skip: 0, limit: 0, orderBy: {updatedAt: OrderBy.ASC}},
          {
            count: 3,
            hasPrevious: false,
            hasNext: true,
            nodes: [],
          },
        ],
        [
          {skip: 0, limit: 3, orderBy: {updatedAt: OrderBy.ASC}},
          {
            count: 3,
            hasPrevious: false,
            hasNext: false,
            nodes: [
              {
                have: true,
                userId: expectedUser.id,
                bookId: expectedBooks[0].id,
              },
              {
                have: true,
                userId: expectedUser.id,
                bookId: expectedBooks[1].id,
              },
              {
                have: true,
                userId: expectedUser.id,
                bookId: expectedBooks[2].id,
              },
            ],
          },
        ],
        [
          {skip: 0, limit: 6, orderBy: {updatedAt: OrderBy.ASC}},
          {
            count: 3,
            hasPrevious: false,
            hasNext: false,
            nodes: [
              {
                have: true,
                userId: expectedUser.id,
                bookId: expectedBooks[0].id,
              },
              {
                have: true,
                userId: expectedUser.id,
                bookId: expectedBooks[1].id,
              },
              {
                have: true,
                userId: expectedUser.id,
                bookId: expectedBooks[2].id,
              },
            ],
          },
        ],
        [
          {skip: 1, limit: 1, orderBy: {updatedAt: OrderBy.ASC}},
          {
            count: 3,
            hasPrevious: true,
            hasNext: true,
            nodes: [
              {
                have: true,
                userId: expectedUser.id,
                bookId: expectedBooks[1].id,
              },
            ],
          },
        ],
        [
          {skip: 3, limit: 3, orderBy: {updatedAt: OrderBy.ASC}},
          {
            count: 3,
            hasPrevious: true,
            hasNext: false,
            nodes: [],
          },
        ],
        [
          {skip: 0, limit: 3, orderBy: {updatedAt: OrderBy.DESC}},
          {
            count: 3,
            hasPrevious: false,
            hasNext: false,
            nodes: [
              {
                have: true,
                userId: expectedUser.id,
                bookId: expectedBooks[2].id,
              },
              {
                have: true,
                userId: expectedUser.id,
                bookId: expectedBooks[1].id,
              },
              {
                have: true,
                userId: expectedUser.id,
                bookId: expectedBooks[0].id,
              },
            ],
          },
        ],
      ])('正常な動作 %j', async (props, expected) => {
        const actual = await usersService.getHaveBooks(expectedUser.id, props);

        expect(actual.count).toBe(expected.count);
        expect(actual.hasPrevious).toBe(expected.hasPrevious);
        expect(actual.hasNext).toBe(expected.hasNext);
        expect(actual.nodes).toHaveLength(expected.nodes.length);
      });
    });
  });
});
