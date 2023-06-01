import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userEntityMock } from '../__mock__/user.mock';
import { createUserMock } from '../__mock__/createUser.mock';

describe('UserService', () => {
  let service: UserService;
  let userRepositoryMock: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userEntityMock),
            save: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepositoryMock = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepositoryMock).toBeDefined();
  });

  it('should return user in findUserById', async () => {
    const user = await service.findUserById(userEntityMock.id);
    expect(user).toEqual(userEntityMock);
  });

  it('should return user in findUserById (undefined)', async () => {
    jest.spyOn(userRepositoryMock, 'findOne').mockResolvedValue(undefined);

    expect(service.findUserById(userEntityMock.id)).rejects.toThrowError();
  });

  it('should return user in findUserByID (erro DB)', async () => {
    jest
      .spyOn(userRepositoryMock, 'findOne')
      .mockRejectedValueOnce(new Error());

    expect(service.findUserById(userEntityMock.id)).rejects.toThrowError();
  });

  it('should return user in findUserByEmail', async () => {
    jest.spyOn(userRepositoryMock, 'findOne').mockResolvedValue(undefined);

    expect(
      service.findUserByEmail(userEntityMock.email),
    ).rejects.toThrowError();
  });

  it('should return user in findUserByEmail (erro DB)', async () => {
    jest
      .spyOn(userRepositoryMock, 'findOne')
      .mockRejectedValueOnce(new Error());

    expect(
      service.findUserByEmail(userEntityMock.email),
    ).rejects.toThrowError();
  });

  it('should return user in getUserByIdUsingRelations', async () => {
    const user = await service.getUserByIdUsingRelations(userEntityMock.id);
    expect(user).toEqual(userEntityMock);
  });

  it('should return error if user exist ', async () => {
    expect(service.createUser(createUserMock)).rejects.toThrowError();
  });

  it('should return user if not exist ', async () => {
    jest.spyOn(userRepositoryMock, 'findOne').mockResolvedValue(undefined);
    const user = await service.createUser(createUserMock);
    expect(user).toEqual(userEntityMock);
  });
});
