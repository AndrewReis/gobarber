import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";


class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authService = container.resolve(AuthenticateUserService);

    const { user, token } = await authService.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  }
}

export default SessionController;
