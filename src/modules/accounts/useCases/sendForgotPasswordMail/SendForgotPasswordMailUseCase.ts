import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private DayjsDateProvider: IDateProvider
  ) {}
  async execute(email: string) {
    const user = await this.usersRepository.findByName(email);

    if (!email) {
      throw new AppError("User does not exists!");
    }

    const token = uuidV4();
    const expires_date = this.DayjsDateProvider.addHours(3);

    await this.usersTokensRepository.create({
      user_id: user.id,
      expires_date,
      refresh_token: token
    });
  }
}

export { SendForgotPasswordMailUseCase };
