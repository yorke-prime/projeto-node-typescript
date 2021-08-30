import { ICreateUserTokenDto } from "../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUsersTokensRepository {
  create({ user_id, expires_date, refresh_token }: ICreateUserTokenDto): Promise<UserTokens>;
};

export { IUsersTokensRepository };
