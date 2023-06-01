import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from '../city.service';
import { CityEntity } from '../entities/city.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { cityEntityMock } from '../__mocks__/city.mock';
import { Repository } from 'typeorm';
import { CacheService } from '../../cache/cache.service';

describe('CityService', () => {
  let service: CityService;
  let stateRepositoryMock: Repository<CityEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: CacheService,
          useValue: {
            getCache: jest.fn().mockResolvedValue([cityEntityMock]),
          },
        },
        {
          provide: getRepositoryToken(CityEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(cityEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    stateRepositoryMock = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(stateRepositoryMock).toBeDefined();
  });

  it('should return findOne City', async () => {
    const city = await service.findCityById(cityEntityMock.id);

    expect(city).toEqual(cityEntityMock);
  });

  it('should return error findOne not found', async () => {
    jest.spyOn(stateRepositoryMock, 'findOne').mockResolvedValueOnce(undefined);
    await expect(
      service.findCityById(cityEntityMock.id),
    ).rejects.toThrowError();
  });

  it('should be return error in exception', async () => {
    jest
      .spyOn(stateRepositoryMock, 'findOne')
      .mockRejectedValueOnce(new Error());
    await expect(
      service.findCityById(cityEntityMock.id),
    ).rejects.toThrowError();
  });

  it('should return Cities in getAllCitiesByStateId', async () => {
    const cities = await service.getAllCitiesByStateId(cityEntityMock.stateId);

    expect(cities).toEqual([cityEntityMock]);
  });
});
