import { inject } from "../../infra/di/Registry";
import AccountRepository from "../../infra/repository/AccountRepository";

export default class GetAccount {
  @inject("AccountRepository")
  accountRepository!: AccountRepository;

  async execute(accountId: string): Promise<Output> {
    const account = await this.accountRepository.getById(accountId)
    
    if (!account) {
      throw new Error("Account not found");
    }

    return account;
  }
}

type Output = {
  accountId: string,
  name: string,
  email: string,
  document: string,
  password: string,
  balances: { assetId: string; quantity: number }[]
}