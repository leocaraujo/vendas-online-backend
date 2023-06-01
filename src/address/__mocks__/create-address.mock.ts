import { cityEntityMock } from '../../city/__mocks__/city.mock';
import { CreateAddressDto } from '../dtos/createAddress.dto';
import { addressEntityMock } from './address.mock';

export const createAddressDtoMock: CreateAddressDto = {
  complement: addressEntityMock.complement,
  numberAddress: addressEntityMock.numberAddress,
  cep: addressEntityMock.cep,
  cityId: cityEntityMock.id,
};
