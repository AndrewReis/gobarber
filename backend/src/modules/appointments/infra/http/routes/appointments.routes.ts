import { Router } from "express";
import AppointmentController from '../controllers/AppointmentController';
import ensureAthenticated from "../../../../users/infra/http/middlewares/ensureAuthenticated";

const appointmentRouter = Router();
const appointmentController = new AppointmentController();


appointmentRouter.use(ensureAthenticated);

// appointmentRouter.get("/", async (request, response) => {
//   const appointments = await appointmentsRepository.find();
//   return response.json(appointments);
// });

appointmentRouter.post("/", appointmentController.create);

export default appointmentRouter;
