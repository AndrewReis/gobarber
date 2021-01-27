import AppError from '@shared/errors/AppErrors';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment.', async () => {
    const fakeRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(fakeRepository);

    const appointment = await createAppointment.execute({
      provider_id: '123456',
      date: new Date(),
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create a two appointments on the same date.', async () => {
    const fakeRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(fakeRepository);

    const appointmentDate = new Date();

    await createAppointment.execute({
      provider_id: '123456',
      date: appointmentDate,
    });

    expect(
      createAppointment.execute({
        provider_id: '123456',
        date: appointmentDate,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
