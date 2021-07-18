import { Specification } from "@modules/car/infra/typeorm/entities/Specification";

import {
  ICreateSpecification,
  ISpecificationRepositoryDTO,
} from "../ISpecificationRepository";

class SpecificationsRepositoryInMemory implements ISpecificationRepositoryDTO {
  specifications: Specification[] = [];

  async create({
    name,
    description,
  }: ICreateSpecification): Promise<Specification> {
    const specification = new Specification();
    Object.assign(specification, {
      description,
      name,
    });

    this.specifications.push(specification);

    return specification;
  }
  async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );

    return allSpecifications;
  }
}

export { SpecificationsRepositoryInMemory };