import { getRepository, Repository } from "typeorm";
import IUserDTO from "@modules/users/dtos/IUserDTO";
import User from "../entities/User";
import IUserRepository from "../../../repositories/IUserRepository";

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: email });
    return user;
  }

  public async create({
    name,
    email,
    password
  }: IUserDTO): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(data: IUserDTO): Promise<User> {
    return this.ormRepository.save(data);
  }
}

export default UserRepository;
