import { inject, injectable } from 'tsyringe';
import AppError from "@shared/errors/AppErrors";

import User from "../infra/typeorm/entities/User";
import IUserRepository from "../repositories/IUserRepository";
import IHashProvider from "../providers/hashProvider/models/IHashProvider";

interface Request {
  name: string;
  email: string;
  password: string;
}

injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ name, email, password }: Request): Promise<User> {

    const checkEmailExist = await this.userRepository.findByEmail(email);

    if (checkEmailExist) {
      throw new AppError("Email address already used.");
    }

    const passwordHashed = await this.hashProvider.genareteHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: passwordHashed,
    });

    return user;
  }
}

export default CreateUserService;
