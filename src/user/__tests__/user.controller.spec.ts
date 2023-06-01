// import { Test } from '@nestjs/testing';
// import { UserController } from '../user.controller';
// import { UserService } from '../user.service';

// describe('UserController', () => {
//   let userController: UserController;
//   let userService: UserService;

//   beforeEach(async () => {
//     const moduleRef = await Test.createTestingModule({
//       controllers: [UserController],
//       providers: [UserService],
//     }).compile();

//     userService = moduleRef.get<UserService>(UserService);
//     userController = moduleRef.get<UserController>(UserController);
//   });

//   describe('findAll', () => {
//     it('should return an array of user', async () => {
//       const result = [];
//       jest.spyOn(userService, 'getAllUser').mockImplementation(() => result);

//       expect(await userController.getAllUser()).toBe(result);
//     });
//   });
// });
