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

  async create({
    name,
    description,
  }: ICreateSpecification): Promise<Specification> {
    const specification = this.repository.create({
      description,
      name,
    });

    await this.repository.save(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = this.repository.findByIds(ids);
    return specifications;
  }
}

export { SpecificationRepository };
