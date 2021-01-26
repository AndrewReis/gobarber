import { getRepository } from "typeorm";
import { hash } from "bcryptjs";

import AppError from "../errors/AppErrors";

import User from "../models/User";

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<User> {
        const userRepository = getRepository(User);

        const checkEmailExist = await userRepository.findOne({
            where: { email },
        });

        if (checkEmailExist) {
            throw new AppError("Email address already used.");
        }

        const passwordHashed = await hash(password, 8);

        const user = userRepository.create({
            name,
            email,
            password: passwordHashed,
        });

        await userRepository.save(user);

        return user;
    }
}

export default CreateUserService;