import { stateEntityMock } from '../../state/__mocks__/state.mock';
import { CityEntity } from '../entities/city.entity';

export const cityEntityMock: CityEntity = {
  createdAt: new Date(),
  id: 0,
  stateId: stateEntityMock.id,
  name: 'Gotham City',
  updatedAt: new Date(),
};
