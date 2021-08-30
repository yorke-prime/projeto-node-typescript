import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<string> {
    const {email, sub} = verify(token, auth.secret_refresh_token) as IPayload;
    const user_id = sub;

    const usersToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);

    if (!usersToken) {
      throw new AppError("Refresh token does not exists!");
    }

    await this.usersTokensRepository.deleteById(usersToken.id);

    const refresh_token = sign({email}, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token
    });

    const expires_date = this.dayjsDateProvider.addDays(auth.expires_refresh_token_days);

    await this.usersTokensRepository.create({
      user_id,
      expires_date,
      refresh_token
    });

    return refresh_token;
  }
}

export { RefreshTokenUseCase };