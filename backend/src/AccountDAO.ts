import pgp from "pg-promise"

export default interface AccountDAO {
  save(account: any): Promise<void>;
  getById(id: string): Promise<any>;
  getByEmail(email: string): Promise<any>;
}

export class AccountDAODatabase implements AccountDAO { 
    async save(account: any): Promise<void> {
        const connection = pgp()("postgres://postgres:123@db:5432/app");
        await connection.query(
                "INSERT INTO ccca.account (account_id, name, email, document, password) VALUES ($1, $2, $3, $4, $5)",
                  [
                    account.accountId, account.name, account.email, account.document, account.password,
                  ]
        );
        await connection.$pool.end();
    }
    async getById(accountId: string): Promise<any> {
        const connection = pgp()("postgres://postgres:123@db:5432/app");
        const [account] = await connection.query(
          "SELECT * FROM ccca.account WHERE account_id = $1",
          [accountId]
        );
        await connection.$pool.end();
        return account;
    }
    async getByEmail(email: string): Promise<any> {
      const connection = pgp()("postgres://postgres:123@db:5432/app");
      const [account] = await connection.query(
        "SELECT count(1) AS hasEmail FROM ccca.account WHERE email = $1",
        [email]
      );
      await connection.$pool.end();
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