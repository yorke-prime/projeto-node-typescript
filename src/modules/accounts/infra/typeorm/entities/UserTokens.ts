import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("users_tokens")
class UserTokens {

  @PrimaryColumn()
  id: string;

  @Column()
  refresh_token: string;

  @Column()
  user_id: string;

  @Column()
  experes_date: Date;

  @CreateDateColumn()
  created_at: Date

}

export { UserTokens };
