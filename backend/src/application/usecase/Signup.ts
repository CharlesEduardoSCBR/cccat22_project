import AccountRepository from "../../infra/repository/AccountRepository";
import { inject } from "../../infra/di/Registry";
import Account from "../../domain/Account";

export default class Signup {
  @inject("AccountRepository")
  accountRepository!: AccountRepository;

  async execute(input: Input): Promise<Output> {
    const account = Account.create(
      input.name,
      input.email,
      input.document,
      input.password
    );
    await this.accountRepository.save(account);
    return { accountId: account.accountId };
  }
}
type Input = {
  name: string;
  email: string;
  password: string;
  document: string;
};
type Output = {
  accountId: string;
};
