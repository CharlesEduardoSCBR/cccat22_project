import crypto from "crypto";
import { AccountDAODatabase } from "../../src/infra/dao/AccountDAO";
import Registry from "../../src/infra/di/Registry";
import DatabaseConnection, { PgPromisseAdapter } from "../../src/infra/database/DatabaseConnection";

let connection: DatabaseConnection;

beforeEach(() => {
  connection = PgPromisseAdapter.getInstance();
  Registry.getInstance().provide("databaseConnection", connection);
});

test("Deve persistir uma conta", async () => {
  const accountDAO = new AccountDAODatabase();
  const account = {
    accountId: crypto.randomUUID(),
    name: "John Doe",
    email: "john.doe@example.com",
    document: "97456321558",
    password: "asdQWE123"
  }

  await accountDAO.save(account);
  const savedAccount = await accountDAO.getById(account.accountId);
  expect(savedAccount.account_id).toBe(account.accountId);
  expect(savedAccount.name).toBe(account.name);
  expect(savedAccount.email).toBe(account.email);
  expect(savedAccount.document).toBe(account.document);
  expect(savedAccount.password).toBe(account.password);
});

afterEach(async () => {
  const connection = PgPromisseAdapter.getInstance();
  await connection.query("TRUNCATE ccca.account_asset RESTART IDENTITY CASCADE", []);
  await connection.query("TRUNCATE ccca.account RESTART IDENTITY CASCADE", []);
});

afterAll(async () => {
  await connection.close();
});