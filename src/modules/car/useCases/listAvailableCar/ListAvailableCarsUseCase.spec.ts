import { CarsRepositoryInMemory } from "@modules/car/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Jaguar port RR",
      description: "Carro de Luxo",
      license_plate: "287-LUD",
      fine_amount: 800,
      daily_rate: 1500,
      brand: "Jaguar",
      category_id: "category23",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Jaguar port RR",
      description: "Carro de Luxo",
      license_plate: "287-LUD",
      fine_amount: 800,
      daily_rate: 1500,
      brand: "Jaguar Br",
      category_id: "category23",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Jaguar Br",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Jaguar port RR",
      description: "Carro de Luxo",
      license_plate: "287-LUD",
      fine_amount: 800,
      daily_rate: 1500,
      brand: "Jaguar Br",
      category_id: "12345",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345",
    });

    expect(cars).toEqual([car]);
  });
});
