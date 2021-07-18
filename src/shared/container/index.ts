import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CarsImagesRepository } from "@modules/car/infra/typeorm/repositories/CarsImagesRepository";
import { CarsRepository } from "@modules/car/infra/typeorm/repositories/CarsRepository";
import { CategoriesRepository } from "@modules/car/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationRepository } from "@modules/car/infra/typeorm/repositories/SpecificationRepository";
import { ICarsImagesRepository } from "@modules/car/repositories/ICarsImagesRepository";
import { ICarsRepository } from "@modules/car/repositories/ICarsRepository";
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

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

container.registerSingleton<ICarsImagesRepository>(
  "CarsImagesRepository",
  CarsImagesRepository
);
