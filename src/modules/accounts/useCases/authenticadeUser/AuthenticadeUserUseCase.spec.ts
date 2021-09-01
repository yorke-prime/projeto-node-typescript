import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMermory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { UsersTokensReposiotryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensReposiotryInMemory";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { AuthenticateUserUseCase } from "./authenticadeUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersTokensRepositoryInMemory: UsersTokensReposiotryInMemory;
let userRepositoryInMemory: UsersRepositoryInMermory;
let createUserUseCase: CreateUserUseCase;
let dayjsDateProvider: DayjsDateProvider;

describe("Authenticate User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMermory();
    usersTokensRepositoryInMemory = new UsersTokensReposiotryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dayjsDateProvider
    );
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "001202",
      email: "test@look.com",
      password: "1234",
      name: "User Test",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticated an no exists user", async () => {
    await expect(authenticateUserUseCase.execute({
      email: "false@look.com",
      password: "teste123",
    })
    ).rejects.toEqual(new AppError("Email or password incorrect"));
  });

  it("should not be able to authenticated with incorrect password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "0000023",
      email: "tst@look.com",
      password: "tst123",
      name: "tst Test",
    };

    await createUserUseCase.execute(user);

    await expect(authenticateUserUseCase.execute({
        email: user.email,
        password: "tst234",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"));
  });
});
