import { userEntityMock } from '../../user/__mock__/user.mock';
import { loginDto } from '../dtos/login.dto';

export const loginUserMock: loginDto = {
  email: userEntityMock.email,
  password: '123456',
};
