import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}
  async execute(token: string, password: string) {
    const userToken = await this.usersTokensRepository.findByResfreshToken(token);

    if (!userToken) {
      throw new AppError("Token invalid");
    }

    if (this.dayjsDateProvider.compareIfBefore(userToken.expires_date, this.dayjsDateProvider.dateNow())) {
      throw new AppError("token expires");
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUseCase };
