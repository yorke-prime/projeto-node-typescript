import { ICreateCarDto } from "@modules/car/dtos/ICreateCarDTO";
import { Car } from "@modules/car/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    description,
    daile_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDto): Promise<void> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daile_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    this.cars.push(car);
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === license_plate);

    return car;
  }
}

export { CarsRepositoryInMemory };
