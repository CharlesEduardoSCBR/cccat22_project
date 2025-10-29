import Account from "../../domain/Account";
import AccountAssetDAO from "../dao/AccountAssetDAO";
import AccountDAO from "../dao/AccountDAO";
import { inject } from "../di/Registry";

export default interface AccountRepository {
  save (account: Account): Promise<void>;
  update (account: Account): Promise<void>;
  getById (accountId: string): Promise<Account>;
}

export class AccountRepositoryDatabase implements AccountRepository {
  @inject("AccountDAO")
  accountDAO!: AccountDAO;
  @inject("AccountAssetDAO")
  accountAssetDAO!: AccountAssetDAO;

  async save(account: Account): Promise<void> {
    await this.accountDAO.save(account);
  }

  async update(account: Account): Promise<void> {
    await this.accountDAO.update(account);
    await this.accountAssetDAO.deleteByAccountId(account.accountId);
    for (const balance of account.balances) {
      await this.accountAssetDAO.save({
        accountId: account.accountId,
        ...balance
      });
    }
  }

  async getById(accountId: string): Promise<Account> {
    console.log('🔍 AccountRepository.getById() INICIANDO para:', accountId);
    
    try {
      console.log("1️⃣ Verificando accountDAO:",typeof this.accountDAO,this.accountDAO);
      console.log("2️⃣ Chamando accountDAO.getById()...");
      const accountData = await this.accountDAO.getById(accountId);
      console.log("3️⃣ accountData recebido:", accountData);
      if (!accountData) {
        console.log("❌ Account not found - accountData é null/undefined");
        throw new Error("Account not found");
      }

      console.log("4️⃣ Criando instância de Account...");
      const account = new Account(
        accountData.account_id,
        accountData.name,
        accountData.email,
        accountData.document,
        accountData.password
      );
      const accountAssetsData = await this.accountAssetDAO.getByAccountId(accountId);
      console.log("6️⃣ Assets recebidos:", accountAssetsData);
      let balancesP: any
      balancesP = [];
      
      accountAssetsData.forEach((balance:any) => {
        let balanceX = {
          accountId: balance.account_id,
          assetId: balance.asset_id,
          quantity: balance.quantity,
        };

        balancesP.push(balanceX);
      });
      account.balances = balancesP;
      console.log(account)
      console.log("✅ AccountRepository.getById() CONCLUÍDO", account);
      return account;
    } catch (error) {
      console.error("💥 ERRO em AccountRepository.getById():", error);
      throw error;
    }
  }
}