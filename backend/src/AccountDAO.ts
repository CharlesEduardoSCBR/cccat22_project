import DatabaseConnection from "./DatabaseConnection";
import { inject } from "./Registry";

export default interface AccountDAO {
  save(account: any): Promise<void>;
  getById(id: string): Promise<any>;
  getByEmail(email: string): Promise<any>;
}

export class AccountDAODatabase implements AccountDAO {
  @inject("databaseConnection")
  connection!: DatabaseConnection;

  async save(account: any): Promise<void> {
    await this.connection.query(
      "INSERT INTO ccca.account (account_id, name, email, document, password) VALUES ($1, $2, $3, $4, $5)",
          [account.accountId, account.name, account.email, account.document, account.password]
        );
  };
  async getById(accountId: string): Promise<any> {
      const [account] = await this.connection.query("SELECT * FROM ccca.account WHERE account_id = $1", [accountId]);
      return account;
  };
  async getByEmail(email: string): Promise<any> {
    const [account] = await this.connection.query("SELECT count(1) AS hasEmail FROM ccca.account WHERE email = $1",[email]);
    const hasemail = parseInt(account.hasemail) > 0 ? 1 : 0;
    return { hasemail };
  };
}

export class AccountDAOMemory implements AccountDAO {
  accounts: any[] = [];

  async save(account: any): Promise<void> {
      this.accounts.push(account);
  }
  async getById(accountId: string): Promise<any> {
      return this.accounts.find(account => accountId === accountId);
  }
  async getByEmail(email: string): Promise<any> {
      return this.accounts.find(account => account.email === email);
  }
}