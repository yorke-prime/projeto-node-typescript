import { Router } from "express";

import { authenRoutes } from "./authenticate.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationRoutes } from "./specification.routes";
import { userRoutes } from "./users.routes";

const router = Router();
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRoutes);
router.use("/users", userRoutes);
router.use(authenRoutes);

export { router };
