import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/car/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/car/useCases/CreateCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/car/useCases/listAvailableCar/ListAvailableCarsController";
import { UploadCarImagesController } from "@modules/car/useCases/uploadCarImages/UploadCarImagesController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticate";

const carRoutes = Router();
const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();
const upload = multer(uploadConfig);

carRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carRoutes.get("/available", listAvailableCarsController.handle);
carRoutes.post("/specifications/:id", createCarSpecificationController.handle);
carRoutes.post(
  "/images/:id",
  upload.array("images"),
  uploadCarImagesController.handle
);

export { carRoutes };
