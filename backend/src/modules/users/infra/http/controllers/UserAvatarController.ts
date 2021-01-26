import { Request, Response } from 'express';
import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository'


class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const userRepository = new UserRepository();

    const avatarService = new UpdateUserAvatarService(userRepository);
    const user = await avatarService.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
}

export default UserAvatarController;
