import { cityEntityMock } from '../../city/__mocks__/city.mock';
import { AddressService } from '../address.service';
import { AddressEntity } from '../entities/address.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../user/user.service';
import { CityService } from '../../city/city.service';
import { userEntityMock } from '../../user/__mock__/user.mock';
import { createAddressDtoMock } from '../__mocks__/create-address.mock';
import { addressEntityMock } from '../__mocks__/address.mock';

describe('AddressService', () => {
  let service: AddressService;
  let addressRepository: Repository<AddressEntity>;
  let userService: UserService;
  let cityService: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: UserService,
          useValue: {
            findUserById: jest.fn().mockResolvedValue(cityEntityMock),
          },
        },
        {
          provide: CityService,
          useValue: {
            findCityById: jest.fn().mockResolvedValue(cityEntityMock),
          },
        },

        {
          provide: getRepositoryToken(AddressEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(addressEntityMock),
            find: jest.fn().mockResolvedValue([addressEntityMock]),
          },
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    userService = module.get<UserService>(UserService);
    cityService = module.get<CityService>(CityService);

    addressRepository = module.get<Repository<AddressEntity>>(
      getRepositoryToken(AddressEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(addressRepository).toBeDefined();
    expect(userService).toBeDefined();
    expect(cityService).toBeDefined();
  });

  it('should return address after save', async () => {
    const address = await service.createAddress(
      createAddressDtoMock,
      userEntityMock.id,
    );

    expect(address).toEqual(addressEntityMock);
  });

  it('should return error if exception in userService', async () => {
    jest.spyOn(userService, 'findUserById').mockRejectedValueOnce(new Error());
    expect(
      service.createAddress(createAddressDtoMock, userEntityMock.id),
    ).rejects.toThrowError();
  });

  it('should return error if exception in cityService', async () => {
    jest.spyOn(cityService, 'findCityById').mockRejectedValueOnce(new Error());
    expect(
      service.createAddress(createAddressDtoMock, userEntityMock.id),
    ).rejects.toThrowError();
  });

  it('should return all address to user', async () => {
    const address = await service.findAddressByUserId(userEntityMock.id);

    expect(address).toEqual([addressEntityMock]);
  });

  it('should return not found if not address', async () => {
    jest.spyOn(addressRepository, 'find').mockResolvedValue(undefined);

    expect(
      service.findAddressByUserId(userEntityMock.id),
    ).rejects.toThrowError();
  });
});
