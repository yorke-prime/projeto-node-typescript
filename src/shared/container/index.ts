import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CategoriesRepository } from "@modules/car/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationRepository } from "@modules/car/infra/typeorm/repositories/SpecificationRepository";
import { ICategoriesRepository } from "@modules/car/repositories/ICategoryRepository";
import { ISpecificationRepositoryDTO } from "@modules/car/repositories/ISpecificationRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationRepositoryDTO>(
  "SpecificationRepository",
  SpecificationRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
