import {INestApplication} from '@nestjs/common';
import {Test} from '@nestjs/testing';
import {OrderBy} from '../../../common/order-by.enum';
import {Neo4jTestModule} from '../../../neo4j/neo4j-test.module';
import {Neo4jService} from '../../../neo4j/neo4j.service';
import {RecordsService} from '../../records.service';

describe(RecordsService.name, () => {
  let app: INestApplication;

  let neo4jService: Neo4jService;

  let recordsService: RecordsService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [Neo4jTestModule],
      providers: [RecordsService],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    neo4jService = module.get<Neo4jService>(Neo4jService);
    recordsService = module.get<RecordsService>(RecordsService);
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

  describe('findById()', () => {
    it('存在しないIDについて取得しようとすると例外を投げる', async () => {
      await expect(() => recordsService.findById('1')).rejects.toThrow(
        /Not Found/,
      );
    });

    it('指定したIDが存在するなら取得できる', async () => {
      await neo4jService.write(
        `
        CREATE (u:User {id: "user1"}), (b:Book {id: "book1"})
        CREATE (r:Record {id: "record1", readAt: "2020-01-01"})
        CREATE (u)-[:RECORDED]->(r)-[:RECORD_OF]->(b)
        RETURN *
        `,
      );

      const actual = await recordsService.findById('record1');

      expect(actual).toStrictEqual({
        id: 'record1',
        readAt: '2020-01-01',
        userId: 'user1',
        bookId: 'book1',
      });
    });
  });

  describe('findAll()', () => {
    const expectedArray = [
      {id: '1'},
      {id: '2'},
      {id: '3'},
      {id: '4'},
      {id: '5'},
    ];

    beforeEach(async () => {
      await Promise.all(
        expectedArray.map((expected) =>
          neo4jService.write(`CREATE (s:Record) SET s = $expected RETURN *`, {
            expected,
          }),
        ),
      );
    });

    it('全件取得できる', async () => {
      const actualArray = await recordsService.findAll();

      actualArray.map((actual) => {
        const expected = expectedArray.find(({id}) => id === actual.id)!;

        expect(expected).not.toBeUndefined();
        expect(actual.id).toBe(expected.id);
      });
    });
  });

  describe('getRecordsFromUserId()', () => {
    beforeEach(async () => {
      await neo4jService.write(
        `
        CREATE (u:User {id: "user1"})
        CREATE (b1:Book {id: "book1", title: "A"})
        CREATE (b2:Book {id: "book2", title: "B"})
        CREATE (b3:Book {id: "book3", title: "C"})
        CREATE (u)-[:RECORDED]->(r1:Record {id: "record1", readAt: "2020-01-01"})-[:RECORD_OF]->(b1)
        CREATE (u)-[:RECORDED]->(r2:Record {id: "record2", readAt: "2020-01-02"})-[:RECORD_OF]->(b2)
        CREATE (u)-[:RECORDED]->(r3:Record {id: "record3", readAt: "2020-01-03"})-[:RECORD_OF]->(b3)
        RETURN *
        `,
      );
    });

    it.each([
      [
        {skip: 0, limit: 0},
        {orderBy: {readAt: OrderBy.ASC}},
        {
          meta: {count: 3},
          entities: [],
        },
      ],
      [
        {skip: 0, limit: 3},
        {orderBy: {readAt: OrderBy.ASC}},
        {
          meta: {count: 3},
          entities: [
            {
              id: 'record1',
              userId: 'user1',
              bookId: 'book1',
              readAt: '2020-01-01',
            },
            {
              id: 'record2',
              userId: 'user1',
              bookId: 'book2',
              readAt: '2020-01-02',
            },
            {
              id: 'record3',
              userId: 'user1',
              bookId: 'book3',
              readAt: '2020-01-03',
            },
          ],
        },
      ],
      [
        {skip: 0, limit: 3},
        {orderBy: {readAt: OrderBy.DESC}},
        {
          meta: {count: 3},
          entities: [
            {
              id: 'record3',
              userId: 'user1',
              bookId: 'book3',
              readAt: '2020-01-03',
            },
            {
              id: 'record2',
              userId: 'user1',
              bookId: 'book2',
              readAt: '2020-01-02',
            },
            {
              id: 'record1',
              userId: 'user1',
              bookId: 'book1',
              readAt: '2020-01-01',
            },
          ],
        },
      ],
      [
        {skip: 0, limit: 1},
        {orderBy: {readAt: OrderBy.ASC}},
        {
          meta: {count: 3},
          entities: [
            {
              id: 'record1',
              userId: 'user1',
              bookId: 'book1',
              readAt: '2020-01-01',
            },
          ],
        },
      ],
      [
        {skip: 1, limit: 1},
        {orderBy: {readAt: OrderBy.ASC}},
        {
          meta: {count: 3},
          entities: [
            {
              id: 'record2',
              userId: 'user1',
              bookId: 'book2',
              readAt: '2020-01-02',
            },
          ],
        },
      ],
      [
        {skip: 3, limit: 3},
        {orderBy: {readAt: OrderBy.ASC}},
        {
          meta: {count: 3},
          entities: [],
        },
      ],
    ])('正常な動作 %j %j', async (offset, params, expected) => {
      const actual = await recordsService.getRecordsFromUserId(
        'user1',
        offset,
        params,
      );
      expect(actual).toStrictEqual(expected);
    });
  });
});
