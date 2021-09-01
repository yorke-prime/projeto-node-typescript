import { UsersRepositoryInMermory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { UsersTokensReposiotryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensReposiotryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/mailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepository: UsersRepositoryInMermory;
let usersTokensRepository: UsersTokensReposiotryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send forgot Mail", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMermory();
    usersTokensRepository = new UsersTokensReposiotryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepository,
      usersTokensRepository,
      dayjsDateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = spyOn(mailProvider, "sendEmail");
    await usersRepository.create({
      name: "Test",
      email: "teste@teste.com",
      password: "teste123",
      driver_license: "teste321",
    });

    await sendForgotPasswordMailUseCase.execute("teste@teste.com");

    expect(sendMail).toHaveBeenCalled();
  });

  /* it("should be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("fjdtse@gmail.com")
    ).rejects.toBeInstanceOf("User does not exists!");
  }); */

  it("should be able to create an users token", async () => {
    const genreteToken = spyOn(usersTokensRepository, "create");

    await usersRepository.create({
      name: "Test1",
      email: "teste1@teste.com",
      password: "testeabc",
      driver_license: "testeabc",
    });

    await sendForgotPasswordMailUseCase.execute("teste1@teste.com");

    expect(genreteToken).toBeCalled();
  });
});
