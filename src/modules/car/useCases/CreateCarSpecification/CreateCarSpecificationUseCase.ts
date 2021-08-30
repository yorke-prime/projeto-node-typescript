import { inject, injectable } from "tsyringe";

import { Car } from "@modules/car/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/car/repositories/ICarsRepository";
import { ISpecificationRepositoryDTO } from "@modules/car/repositories/ISpecificationRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  specification_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepositoryDTO
  ) {}

  async execute({ car_id, specification_id }: IRequest): Promise<Car> {
    const carsExists = this.carsRepository.findById(car_id);

    if (!carsExists) {
      throw new AppError("Car does not exists");
    }
    const specifications = await this.specificationRepository.findByIds(
      specification_id
    );

    if (!specifications) {
      throw new AppError("Specifications does not exists!");
    }

    (await carsExists).specifications = specifications;

    await this.carsRepository.create(await carsExists);

    return carsExists;
  }
}

export { CreateCarSpecificationUseCase };
