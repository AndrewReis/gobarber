import { Request, Response } from 'express';
import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository'


class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const userRepository = new UserRepository();

    const authService = new AuthenticateUserService(userRepository);

    const { user, token } = await authService.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  }
}

export default SessionController;
