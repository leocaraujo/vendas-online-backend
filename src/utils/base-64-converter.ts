import { LoginPayload } from '../auth/dtos/loginPayload.dto';

export const authorizationToLoginPayload = (
  authorization: string,
): LoginPayload => {
  const authorizationSplite = authorization.split('.');
  if (authorizationSplite.length < 3 || !authorizationSplite[1]) {
    throw new Error('Invalid authorization');
  }
  return JSON.parse(
    Buffer.from(authorizationSplite[1], 'base64').toString('ascii'),
  );
};
