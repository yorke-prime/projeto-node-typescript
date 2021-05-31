import { Router } from "express";

import { CreateCarController } from "@modules/car/useCases/createCar/CreateCarController";

const carRoutes = Router();
const createCarController = new CreateCarController();

carRoutes.post("/", createCarController.handle);

export { carRoutes };
