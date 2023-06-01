import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StateEntity } from '../entities/state.entity';
import { StateService } from '../state.service';
import { stateEntityMock } from '../__mocks__/state.mock';

describe('StateService', () => {
  let service: StateService;
  let stateRepositoryMock: Repository<StateEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StateService,
        {
          provide: getRepositoryToken(StateEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([stateEntityMock]),
          },
        },
      ],
    }).compile();

    service = module.get<StateService>(StateService);
    stateRepositoryMock = module.get<Repository<StateEntity>>(
      getRepositoryToken(StateEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(stateRepositoryMock).toBeDefined();
  });

  it('should be list of states', async () => {
    const state = await service.getAllState();
    expect(state).toEqual([stateEntityMock]);
  });

  it('should be return erro in exception', async () => {
    jest.spyOn(stateRepositoryMock, 'find').mockRejectedValueOnce(new Error());
    await expect(service.getAllState()).rejects.toThrowError();
  });
});
