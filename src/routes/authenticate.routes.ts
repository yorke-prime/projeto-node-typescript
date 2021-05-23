import { Router } from "express";

import { AuthenticateUserController } from "../modules/accounts/useCases/authenticadeUser/authenticateUserController";

const authenRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenRoutes.post("/session", authenticateUserController.handle);

export { authenRoutes };
