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
    console.log("💾 SALVANDO conta banco direto:", account);
    const result = await this.connection.query(
      "INSERT INTO ccca.account (account_id, name, email, document, password) VALUES ($1, $2, $3, $4, $5)",
          [account.accountId, account.name, account.email, account.document, account.password]
        );
    console.log("✅ SALVO no banco. Result:", result);
  };
  async update(account: any): Promise<void> {
    await this.connection.query(
      "UPDATE ccca.account SET name = $1, email = $2, document = $3, password = $4 WHERE account_id = $5",
      [account.name,  account.email, account.document, account.password, account.accountId]
    );
  };
  async getById(accountId: string): Promise<any> {
      console.log("🔍 BUSCANDO accountId banco direto:", accountId);
      const result = await this.connection.query(
        "SELECT * FROM ccca.account WHERE account_id = $1",
        [accountId]
      );
      console.log("📦 Resultado da query:", result);
      const [account] = result;
      console.log("✅ Conta encontrada:", account);
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
    console.log("🔍 BUSCANDO accountId:", accountId);
    console.log("📦 Total de contas no array:", this.accounts.length);
    console.log("📋 Contas disponíveis:", this.accounts);
    const found = this.accounts.find((account) => {
      console.log(
        `   Comparando: "${account.accountId}" === "${accountId}" ?`,
        account.accountId === accountId
      );
      return account.accountId === accountId;
    });

    console.log("✅ Conta encontrada:", found);
    return found;
  }
  async getByEmail(email: string): Promise<any> {
      return this.accounts.find(account => account.email === email);
  }
}