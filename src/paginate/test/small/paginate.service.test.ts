import {INestApplication} from '@nestjs/common';
import {Test} from '@nestjs/testing';
import * as Relay from 'graphql-relay';
import {PaginateModule} from '../../paginate.module';
import {PaginateService} from '../../paginate.service';

jest.mock('graphql-relay');

describe(PaginateService.name, () => {
  let app: INestApplication;

  let paginateService: PaginateService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [PaginateModule],
      providers: [PaginateService],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    paginateService = module.get<PaginateService>(PaginateService);
  });

  describe('getPagingParameters()', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('引数が空', () => {
      const actual = paginateService.getPagingParameters({});
      expect(actual).toStrictEqual({limit: 0, skip: 0});
    });

    it('firstのみ', () => {
      const actual = paginateService.getPagingParameters({first: 10});
      expect(actual).toStrictEqual({limit: 10, skip: 0});
    });

    it('lastのみ', () => {
      const actual = paginateService.getPagingParameters({last: 10});
      expect(actual).toStrictEqual({limit: 0, skip: 0});
    });

    it.each([[{first: 10, after: 'x'}, {limit: 10, skip: 6}, 5]])(
      'firstとafterを同時指定 %#',
      (args, expected, mock) => {
        jest.spyOn(Relay, 'cursorToOffset').mockReturnValueOnce(mock);

        const actual = paginateService.getPagingParameters(args);
        expect(actual).toStrictEqual(expected);
      },
    );

    it.each([
      [{last: 10, before: 'x'}, {limit: 0, skip: 0}, 0],
      [{last: 10, before: 'x'}, {limit: 4, skip: 0}, 5],
      [{last: 10, before: 'x'}, {limit: 9, skip: 0}, 10],
      [{last: 10, before: 'x'}, {limit: 10, skip: 4}, 15],
    ])('lastをbeforeを同時指定 %#', (args, expected, mock) => {
      jest.spyOn(Relay, 'cursorToOffset').mockReturnValueOnce(mock);

      const actual = paginateService.getPagingParameters(args);
      expect(actual).toStrictEqual(expected);
    });
  });
});
