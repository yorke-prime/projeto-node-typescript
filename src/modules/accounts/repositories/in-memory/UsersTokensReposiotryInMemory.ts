import { ICreateUserTokenDto } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensReposiotryInMemory implements IUsersTokensRepository {
  usersTokens: UserTokens[] = [];
  async create({ user_id, expires_date, refresh_token }: ICreateUserTokenDto): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      user_id,
      expires_date,
      refresh_token,
    });

    this.usersTokens.push(userToken);

    return userToken;
  }
  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
    const userToken = this.usersTokens.find(userToken => userToken.user_id === user_id && userToken.refresh_token === refresh_token);
    return userToken;
  }
  async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.find(userToken => userToken.id === id);
    this.usersTokens.splice(this.usersTokens.indexOf(userToken));
  }
  async findByResfreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = this.usersTokens.find(userToken => userToken.refresh_token === refresh_token);
    return userToken;
  }
  async findById(user_id: string): Promise<UserTokens> {
    const userToken = this.usersTokens.find(userToken => userToken.user_id === user_id);
    return userToken;
  }

}

export { UsersTokensReposiotryInMemory };
