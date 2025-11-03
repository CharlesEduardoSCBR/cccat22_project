import DatabaseConnection from "../database/DatabaseConnection";
import { inject } from "../di/Registry";

export default interface AccountDAO {
  save(account: any): Promise<void>;
  update(account: any): Promise<void>;
  getById(id: string): Promise<any>;
  getByEmail(email: string): Promise<any>;
}

export class AccountDAODatabase implements AccountDAO {
  @inject("databaseConnection")
  connection!: DatabaseConnection;

  async save(account: any): Promise<void> {
    const result = await this.connection.query(
      "INSERT INTO ccca.account (account_id, name, email, document, password) VALUES ($1, $2, $3, $4, $5)",
          [account.accountId, account.name, account.email, account.document, account.password]
        );
  };
  async update(account: any): Promise<void> {
    await this.connection.query(
      "UPDATE ccca.account SET name = $1, email = $2, document = $3, password = $4 WHERE account_id = $5",
      [account.name,  account.email, account.document, account.password, account.accountId]
    );
  };
  async getById(accountId: string): Promise<any> {
      const result = await this.connection.query(
        "SELECT * FROM ccca.account WHERE account_id = $1",
        [accountId]
      );
      const [account] = result;
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
  update(account: any): Promise<void> {
      throw new Error("Method not implemented.");
  }
  async getById(accountId: string): Promise<any> {
    const found = this.accounts.find((account) => {
      return account.accountId === accountId;
    });
    return found;
  }
  async getByEmail(email: string): Promise<any> {
      return this.accounts.find(account => account.email === email);
  }
}