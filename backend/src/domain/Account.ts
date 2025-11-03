import AccountValidate from "./AccountValidate";
import { validateCpf } from "./validateCpf";

export default class Account {
  balances: Balance[] = [];
  //private name: Name;
  //private email: Email;
  //private document: Document;
  //private password: Password;

  constructor(
    readonly accountId: string,
    readonly name: string,
    readonly email: string,
    readonly document: string,
    readonly password: string
  ) {
    if (!AccountValidate.validarNome(name)) throw new Error("Nome inválido");
    if (!AccountValidate.validarEmail(email)) throw new Error("Email inválido");
    if (!AccountValidate.validarPassword(password))
      throw new Error("Senha inválida");
    if (!validateCpf(document)) throw new Error("Documento inválido");
  }

  static create(
    name: string,
    email: string,
    document: string,
    password: string
  ) {
    const accountId = crypto.randomUUID();
    return new Account(accountId, name, email, document, password);
  }

  deposit(assetId: string, quantity: number) {
    const balance = this.balances.find(
      (balance: Balance) => balance.assetId === assetId
    );
    if (balance) {
      balance.quantity += quantity;
    } else {
      this.balances.push({ assetId, quantity });
    }
  }

  withdraw(assetId: string, quantity: number) {
    const balance = this.balances.find((balance: Balance) => {
      return balance.assetId === assetId;
    });
    if (!balance || balance.quantity < quantity)
      throw new Error("Insuficient funds");
    balance.quantity -= quantity;
  }

  getBalance(assetId: string) {
    const balance = this.balances.find(
      (balance: Balance) => balance.assetId === assetId
    );
    if (!balance) return 0;
    return balance;
  }
  /*
  getName() {
    return this.name.getValue();
  }

  getEmail() {
    return this.email.getValue();
  }

  getDocument() {
    return this.document.getValue();
  }

  getPassword() {
    return this.password.getValue();
  }
    */
}

type Balance = {
  assetId: string;
  quantity: number;
};