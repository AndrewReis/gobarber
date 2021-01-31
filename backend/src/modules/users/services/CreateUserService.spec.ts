import AppError from '@shared/errors/AppErrors';
import FakeUsersRepository from '../repositories/fakes/UsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider'


describe('CreateUser', () => {
  it('should be able to create a new user.', async () => {
    const fakeRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeRepository, fakeHashProvider);

    const user =  await createUser.execute({
      name:'John Doe',
      email: 'johndoe@contato.com',
      password:'123456'
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a user with same e-mail.', async () => {
    const fakeRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeRepository, fakeHashProvider);

    await createUser.execute({
      name:'John Doe',
      email: 'johndoe@contato.com',
      password:'123456'
    });

    expect(
      createUser.execute({
        name:'John Doe',
        email: 'johndoe@contato.com',
        password:'123456'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
