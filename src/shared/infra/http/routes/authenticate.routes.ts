import { Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/useCases/authenticadeUser/authenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";

const authenRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenRoutes.post("/sessions", authenticateUserController.handle);
authenRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenRoutes };
