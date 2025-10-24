import crypto from "crypto";
import { validateCpf } from "./validateCpf";
import AccountValidate from "./AccountValidate";
import AccountDAO from "./AccountDAO";
import { inject } from "./Registry";

export default class AccountService {
  @inject("AccountDAO")
  accountDAO!: AccountDAO; 

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
  
}
