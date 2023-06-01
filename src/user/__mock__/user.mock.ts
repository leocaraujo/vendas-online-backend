import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enums/user-type.enum';

export const userEntityMock: UserEntity = {
  cpf: '12345678900',
  createdAt: new Date(),
  email: 'emailmock@email.com',
  id: 1,
  name: 'test',
  password: '123456',
  phone: '12345678900',
  updatedAt: new Date(),
  typeUser: UserType.User,
  addresses: [],
};
