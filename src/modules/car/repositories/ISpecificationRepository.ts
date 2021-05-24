import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateSpecification {
  name: string;
  description: string;
}

interface ISpecificationRepositoryDTO {
  create({ name, description }: ICreateSpecification): Promise<void>;
  findByName(name: string): Promise<Specification>;
}

export { ISpecificationRepositoryDTO, ICreateSpecification };
