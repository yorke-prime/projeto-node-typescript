import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMermory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { AppError } from "@shared/errors/AppError";

import { AuthenticateUserUseCase } from "./authenticadeUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UsersRepositoryInMermory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMermory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory
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

  it("should not be able to authenticated an no exists user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "false@look.com",
        password: "teste123",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticated with incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "0000023",
        email: "tst@look.com",
        password: "tst123",
        name: "tst Test",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "tst234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
