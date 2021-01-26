import IUserDTO from "../dtos/IUserDTO";
import User from "../infra/typeorm/entities/User";

interface IUserRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: IUserDTO): Promise<User>
  save(data: IUserDTO): Promise<User>
}

export default IUserRepository;
