import { CacheService } from '../cache.service';
import { Test, TestingModule } from '@nestjs/testing';
import { userEntityMock } from '../../user/__mock__/user.mock';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

describe('CacheService', () => {
  let service: CacheService;
  let cacheManager: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: () => userEntityMock,
            set: () => jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CacheService>(CacheService);
    cacheManager = module.get(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cacheManager).toBeDefined();
  });

  it('should return data in cache', async () => {
    const result = { test: 'test' };
    jest.spyOn(cacheManager, 'get').mockResolvedValue(result);

    const user = await service.getCache('key', () => Promise.resolve(result));

    expect(user).toEqual(result);
  });
});
