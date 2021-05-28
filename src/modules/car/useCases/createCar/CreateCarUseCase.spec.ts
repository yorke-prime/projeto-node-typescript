import { CarsRepositoryInMemory } from "@modules/car/repositories/in-memory/CarsRepositoryInMemory";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create car", async () => {
    await createCarUseCase.execute({
      name: "Alfha rt",
      description: "super carro esportivo",
      daile_rate: 100,
      license_plate: "ABC-345",
      fine_amount: 50,
      brand: "Ferrari",
      category_id: "11241255",
    });
  });
});
