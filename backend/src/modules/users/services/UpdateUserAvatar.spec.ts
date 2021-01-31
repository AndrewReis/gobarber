import AppError from '@shared/errors/AppErrors';
import FakeUsersRepository from '../repositories/fakes/UsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeStorageProvider from '@shared/container/providers/storageProvider/fakes/FakeStorageProvider'


describe('UpdateUserAvatar', () => {
  it('should be able to update avatar.', async () => {
    const fakeRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateAvatar = new UpdateUserAvatarService(fakeRepository, fakeStorageProvider);

    const user = await fakeRepository.create({
      name: 'John Doe',
      email: 'johndoe@contato.com',
      password: '123456',
    })

    await updateAvatar.execute({
      avatarFileName: 'example.png',
      user_id: user.id,
    });

    expect(user.avatar).toBe('example.png');
  });

  it('should not be able to update avatar from non existing user.', async () => {
    const fakeRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateAvatar = new UpdateUserAvatarService(fakeRepository, fakeStorageProvider);

    expect(
      updateAvatar.execute({
        avatarFileName: 'example.png',
        user_id: 'non-existing-user',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one.', async () => {
    const fakeRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFiles = jest.spyOn(fakeStorageProvider, 'deleteFiles');

    const updateAvatar = new UpdateUserAvatarService(fakeRepository, fakeStorageProvider);

    const user = await fakeRepository.create({
      name: 'John Doe',
      email: 'johndoe@contato.com',
      password: '123456',
    })

    await updateAvatar.execute({
      avatarFileName: 'example.png',
      user_id: user.id,
    });

    await updateAvatar.execute({
      avatarFileName: 'example02.png',
      user_id: user.id,
    });

    expect(deleteFiles).toHaveBeenCalledWith('example.png');
    expect(user.avatar).toBe('example02.png');
  });

});
