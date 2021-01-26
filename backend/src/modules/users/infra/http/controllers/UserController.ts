import { Request, Response } from 'express';
import CreateUserService from "@modules/users/services/CreateUserService";
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository'

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const userRepository = new UserRepository();

    const userService = new CreateUserService(userRepository);

    const user = await userService.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  }
}

export default UserController;
