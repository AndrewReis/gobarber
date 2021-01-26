import { Request, Response } from 'express';
import { parseISO } from "date-fns";

import AppointmentsRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentsRepository";
import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService";

class AppointmentController {

  // public async index(): Promise<Response>{
  //   const appointments = await appointmentsRepository.find();
  //   return response.json(appointments);
  // }

  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);
    const appointmentsRepository = new AppointmentsRepository();


    const createAppoitment = new CreateAppointmentService(appointmentsRepository);

    const appointment = await createAppoitment.execute({
      provider_id,
      date: parsedDate,
    });

    return response.json(appointment);
  }
}

export default AppointmentController;
