import IUserDTO from "@modules/users/dtos/IUserDTO";
import { v4 as uuid } from "uuid";
import User from "../../infra/typeorm/entities/User";
import IUserRepository from "../../repositories/IUserRepository";

class UserRepository implements IUserRepository {
  private userRepository: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.userRepository.find(user => user.id === id)
    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.userRepository.find(user => user.email === email)
    return findUser;
  }

  public async create({
    name,
    email,
    password
  }: IUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid(), name, email, password })
    this.userRepository.push(user)

    return user;
  }

  public async save(data: User): Promise<User> {
    const findUser = this.userRepository.findIndex(user => user)
    this.userRepository[findUser] = data;

    return data;
  }
}

export default UserRepository;
