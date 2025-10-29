import { inject } from "../../infra/di/Registry";
import AccountRepository from "../../infra/repository/AccountRepository";

export default class Deposit {
  @inject("AccountRepository")
  accountRepository!: AccountRepository;

  async execute(input: Input) {
    const account = await this.accountRepository.getById(input.accountId);
    account.deposit(input.assetId, input.quantity);
    await this.accountRepository.update(account);
  }
}

type Input = {
  accountId: string;
  assetId: string;
  quantity: number;
};