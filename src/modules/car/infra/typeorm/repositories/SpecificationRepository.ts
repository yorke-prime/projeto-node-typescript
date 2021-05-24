import { getRepository, Repository } from "typeorm";

import { Specification } from "@modules/car/infra/typeorm/entities/Specification";
import {
  ISpecificationRepositoryDTO,
  ICreateSpecification,
} from "@modules/car/repositories/ISpecificationRepository";

class SpecificationRepository implements ISpecificationRepositoryDTO {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecification): Promise<void> {
    const specification = this.repository.create({
      description,
      name,
    });

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });

    return specification;
  }
}

export { SpecificationRepository };
