import {INestApplication} from '@nestjs/common';
import {Test} from '@nestjs/testing';
import {OrderBy} from '../../../common/order-by.enum';
import {Neo4jTestModule} from '../../../neo4j/neo4j-test.module';
import {Neo4jService} from '../../../neo4j/neo4j.service';
import {StackedBooksService} from '../../stacked-books.service';

describe(StackedBooksService.name, () => {
  let app: INestApplication;

  let neo4jService: Neo4jService;

  let usersService: StackedBooksService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [Neo4jTestModule],
      providers: [StackedBooksService],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    neo4jService = module.get<Neo4jService>(Neo4jService);

    usersService = module.get<StackedBooksService>(StackedBooksService);
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

  describe('getStackedBooksFromUserId()', () => {
    it('READ_BOOKが混ざっている状況', async () => {
      await neo4jService.write(
        `
        CREATE (u:User {id: "user1"})
        CREATE (b1:Book {id: "book1", title: "A"})
        CREATE (b2:Book {id: "book2", title: "B"})
        CREATE (b3:Book {id: "book3", title: "C"})
        CREATE (u)-[:HAS_BOOK {updatedAt: "2020-01-01T00:00:00.000000000Z", have: true}]->(b1)
        CREATE (u)-[:HAS_BOOK {updatedAt: "2020-01-02T00:00:00.000000000Z", have: true}]->(b2)
        CREATE (u)-[:HAS_BOOK {updatedAt: "2020-01-03T00:00:00.000000000Z", have: true}]->(b3)
        CREATE (u)-[:RECORDED {readAt: ["2000-01-01"]}]->(r:Record)-[:RECORD_OF]->(b1)
        RETURN *
        `,
      );
      const actual = await usersService.getStackedBooksFromUserId(
        'user1',
        {skip: 0, limit: 3},
        {orderBy: {updatedAt: OrderBy.DESC}},
      );
      expect(actual.entities).toHaveLength(3);
      expect(actual.meta).toStrictEqual({count: 3});
    });
  });
});
