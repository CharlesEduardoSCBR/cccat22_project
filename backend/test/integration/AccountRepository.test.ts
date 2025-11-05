import crypto from "crypto";
import { PgPromisseAdapter } from "../../src/infra/database/DatabaseConnection";
import Registry from "../../src/infra/di/Registry";
import { AccountDAODatabase } from "../../src/infra/dao/AccountDAO";
import { AccountRepositoryDatabase, AccountRepositoryORM } from "../../src/infra/repository/AccountRepository";
import Account from "../../src/domain/Account";
import { AccountAssetDAODatabase } from "../../src/infra/dao/AccountAssetDAO";
import ORM from "../../src/infra/orm/ORM";

test("Deve persistir uma conta", async () => {
  const connection = PgPromisseAdapter.getInstance();;
  Registry.getInstance().provide("databaseConnection", connection);
  Registry.getInstance().provide("orm", new ORM());
   const accountRepository = new AccountRepositoryORM();
  const account = Account.create(
    "John Doe",
    "john.doe@gmail.com",
    "97456321558",
    "asdQWE123"
  );
  account.deposit("USD", 100000);
  account.deposit("BTC", 100);
  await accountRepository.save(account);
  const savedAccount = await accountRepository.getById(account.accountId);
  expect(savedAccount.accountId).toBe(account.accountId);
  expect(savedAccount.getName()).toBe(account.getName());
  expect(savedAccount.getEmail()).toBe(account.getEmail());
  expect(savedAccount.getDocument()).toBe(account.getDocument());
  expect(savedAccount.getPassword()).toBe(account.getPassword());
  expect(savedAccount.balances).toHaveLength(2);
  expect(savedAccount.balances[0].quantity).toBe(100000);
  expect(savedAccount.balances[1].quantity).toBe(100);
});
