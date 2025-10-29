import crypto from "crypto";
import { validateCpf } from "../../domain/validateCpf";
import AccountValidate from "../../domain/AccountValidate";
import AccountDAO from "../../infra/dao/AccountDAO";
import { inject } from "../../infra/di/Registry";
import AccountAssetDAO from "../../infra/dao/AccountAssetDAO";

export default class AccountService {
  @inject("AccountDAO")
  accountDAO!: AccountDAO;
  @inject("AccountAssetDAO")
  accountAssetDAO!: AccountAssetDAO;

  async signup(account: any): Promise<any> {
    account.accountId = crypto.randomUUID();
    if (!AccountValidate.validarNome(account.name)) throw new Error("Nome inválido");
    if (!AccountValidate.validarEmail(account.email)) throw new Error("Email inválido");
    if (!AccountValidate.validarPassword(account.password)) throw new Error("Senha inválida");
    if (!validateCpf(account.document)) throw new Error("Documento inválido");
    await this.accountDAO.save(account);
    return { accountId : account.accountId};
  }
  
  async getAccountById(accountId: string): Promise<any> {
    return this.accountDAO.getById(accountId);
  }

async getAccount(accountId: string): Promise<any> {
    const account = await this.accountDAO.getById(accountId);
    const assets = await this.accountAssetDAO.getByAccountId(accountId);
    account.balances = assets;
    return account;
  }

  async deposit (accountAsset: any) {
    const account = await this.accountDAO.getById(accountAsset.accountId);
    if (!account) {throw new Error("Account not found");}
    await this.accountAssetDAO.save(accountAsset);
  }

  async withdraw (accountAsset: any) {
    const account = await this.getAccount(accountAsset.accountId);
    const balances = account.balances.find((balance: any) => balance.assetId === accountAsset.assetId);
    const quantity = parseFloat(balances.quantity) - accountAsset.quantity;
    if (quantity < 0) {throw new Error("Insuficient funds");}
    await this.accountAssetDAO.update({ accountId: accountAsset.accountId, assetId: accountAsset.assetId, quantity });
  }
}
