import { Router } from "express";

import { CreateCarController } from "@modules/car/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/car/useCases/listAvailableCar/ListAvailableCarsController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticate";

const carRoutes = Router();
const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carRoutes.get("/available", listAvailableCarsController.handle);

export { carRoutes };
