import path from "path";
import fs from "fs";
import { injectable, inject } from 'tsyringe';

import AppError from "@shared/errors/AppErrors";

import uploadConfig from "@config/upload";
import User from "../infra/typeorm/entities/User";
import IUserRepository from "../repositories/IUserRepository";
import IStorageProvader from '@shared/container/providers/storageProvider/models/IStorageProvader';

interface Request {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('IStorageProvader')
    private storageProvider: IStorageProvader,
  ) {}

  public async execute({ user_id, avatarFileName }: Request): Promise<User> {

    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError("Only authenticated users can change avatar.", 401);
    }

    // Deletar arquivo no disco
    if (user.avatar) {
     await this.storageProvider.deleteFiles(user.avatar);
    }

    const fileName = await this.storageProvider.saveFiles(avatarFileName);

    user.avatar = fileName;

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
