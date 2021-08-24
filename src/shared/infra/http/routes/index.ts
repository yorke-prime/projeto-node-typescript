import { Router } from "express";

import { authenRoutes } from "./authenticate.routes";
import { carRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { rentalRoutes } from "./rentals.routes";
import { specificationRoutes } from "./specification.routes";
import { userRoutes } from "./users.routes";

const router = Router();
router.use("/cars", carRoutes);
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRoutes);
router.use("/users", userRoutes);
router.use(authenRoutes);
router.use("/rentals", rentalRoutes);

export { router };
