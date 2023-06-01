import { cityEntityMock } from '../../city/__mocks__/city.mock';
import { AddressEntity } from '../entities/address.entity';
import { userEntityMock } from '../../user/__mock__/user.mock';

export const addressEntityMock: AddressEntity = {
  id: 1,
  complement: '1',
  numberAddress: 1,
  cep: '1',
  cityId: cityEntityMock.id,
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: userEntityMock.id,
};
