import { ICreateUserTokenDto } from "../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUsersTokensRepository {
  create({ user_id, expires_date, refresh_token }: ICreateUserTokenDto): Promise<UserTokens>;
  findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens>;
  deleteById(id: string): Promise<void>;
  findByResfreshToken(refresh_token: string): Promise<UserTokens>
  findById(user_id: string): Promise<UserTokens>
};

export { IUsersTokensRepository };
