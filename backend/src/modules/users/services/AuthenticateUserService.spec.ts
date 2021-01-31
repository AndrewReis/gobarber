import AppError from '@shared/errors/AppErrors';
import FakeUsersRepository from '../repositories/fakes/UsersRepository';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider'

describe('AuthenticateUser', () => {
  it('should be able to authenticate.', async () => {
    const fakeRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeRepository, fakeHashProvider);
    const authenticateUser = new AuthenticateUserService(fakeRepository, fakeHashProvider);

    await createUser.execute({
      name:'John Doe',
      email: 'johndoe@contato.com',
      password:'123456'
    });


    const response = await authenticateUser.execute({
      email: 'johndoe@contato.com',
      password:'123456'
    })

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate with non existing user.', async () => {
    const fakeRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(fakeRepository, fakeHashProvider);

    expect(
      authenticateUser.execute({
        email: 'johndoe@contato.com',
        password:'123456'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate user wrong password.', async () => {
    const fakeRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeRepository, fakeHashProvider);
    const authenticateUser = new AuthenticateUserService(fakeRepository, fakeHashProvider);

    await createUser.execute({
      name:'John Doe',
      email: 'johndoe@contato.com',
      password:'123456'
    });

    expect(
      authenticateUser.execute({
        email: 'johndoe@contato.com',
        password:'wrong-password'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

});
