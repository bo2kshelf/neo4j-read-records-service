import {INestApplication} from '@nestjs/common';
import {Test} from '@nestjs/testing';
import {OrderBy} from '../../../common/order-by.enum';
import {Neo4jTestModule} from '../../../neo4j/neo4j-test.module';
import {Neo4jService} from '../../../neo4j/neo4j.service';
import {ReadBooksService} from '../../read-books.service';

describe(ReadBooksService.name, () => {
  let app: INestApplication;

  let neo4jService: Neo4jService;

  let recordsService: ReadBooksService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [Neo4jTestModule],
      providers: [ReadBooksService],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    neo4jService = module.get<Neo4jService>(Neo4jService);
    recordsService = module.get<ReadBooksService>(ReadBooksService);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    await neo4jService.write(`MATCH (n) DETACH DELETE n`);
  });

  afterAll(async () => {
    await app.close();
  });

  it('to be defined', () => {
    expect(recordsService).toBeDefined();
  });

  describe('getReadBooksFromUser()', () => {
    beforeEach(async () => {
      await neo4jService.write(
        `
        CREATE (u:User {id: "user1"})
        CREATE (b1:Book {id: "book1", title: "A"})
        CREATE (b2:Book {id: "book2", title: "B"})
        CREATE (b3:Book {id: "book3", title: "C"})
        CREATE (u)-[:RECORDED]->(r1:Record {id: "record1"})-[:RECORD_OF]->(b1)
        CREATE (u)-[:RECORDED]->(r2:Record {id: "record2"})-[:RECORD_OF]->(b2)
        CREATE (u)-[:RECORDED]->(r3:Record {id: "record3"})-[:RECORD_OF]->(b3)
        RETURN *
        `,
      );
    });

    it.each([
      [
        {
          skip: 0,
          limit: 0,
        },
        {
          orderBy: {title: OrderBy.ASC},
        },
        {
          entities: [],
          meta: {count: 3},
        },
      ],
      [
        {
          skip: 0,
          limit: 3,
        },
        {
          orderBy: {title: OrderBy.ASC},
        },
        {
          entities: [
            {userId: 'user1', bookId: 'book1'},
            {userId: 'user1', bookId: 'book2'},
            {userId: 'user1', bookId: 'book3'},
          ],
          meta: {count: 3},
        },
      ],
      [
        {
          skip: 0,
          limit: 3,
        },
        {
          orderBy: {title: OrderBy.DESC},
        },
        {
          entities: [
            {userId: 'user1', bookId: 'book3'},
            {userId: 'user1', bookId: 'book2'},
            {userId: 'user1', bookId: 'book1'},
          ],
          meta: {count: 3},
        },
      ],
      [
        {
          skip: 0,
          limit: 1,
        },
        {
          orderBy: {title: OrderBy.ASC},
        },
        {
          entities: [{userId: 'user1', bookId: 'book1'}],
          meta: {count: 3},
        },
      ],
      [
        {
          skip: 1,
          limit: 1,
        },
        {
          orderBy: {title: OrderBy.ASC},
        },
        {
          entities: [{userId: 'user1', bookId: 'book2'}],
          meta: {count: 3},
        },
      ],
      [
        {
          skip: 3,
          limit: 3,
        },
        {
          orderBy: {title: OrderBy.ASC},
        },
        {
          entities: [],
          meta: {count: 3},
        },
      ],
    ])('正常な動作 %j', async (offset, params, expected) => {
      const actual = await recordsService.getReadBooksFromUser(
        'user1',
        offset,
        params,
      );
      expect(actual).toStrictEqual(expected);
    });
  });
});
