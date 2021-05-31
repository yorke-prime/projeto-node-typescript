import { CarsRepositoryInMemory } from "@modules/car/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create car", async () => {
    const car = await createCarUseCase.execute({
      name: "Alfha rt",
      description: "super carro esportivo",
      daily_rate: 100,
      license_plate: "ABC-345",
      fine_amount: 50,
      brand: "Ferrari",
      category_id: "11241255",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with exists license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car 1",
        description: "super carro esportivo",
        daily_rate: 100,
        license_plate: "ABC-345",
        fine_amount: 50,
        brand: "Ferrari",
        category_id: "11241255",
      });

      await createCarUseCase.execute({
        name: "Car 2",
        description: "super carro esportivo",
        daily_rate: 100,
        license_plate: "ABC-345",
        fine_amount: 50,
        brand: "Ferrari",
        category_id: "11241255",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      description: "super carro esportivo",
      daily_rate: 100,
      license_plate: "ABCD-345",
      fine_amount: 50,
      brand: "Ferrari",
      category_id: "11241255",
    });

    expect(car.available).toBe(true);
  });
});
