import { AccountDAODatabase, AccountDAOMemory } from "../../src/infra/dao/AccountDAO";
import { AccountAssetDAODatabase } from "../../src/infra/dao/AccountAssetDAO"; 
import Registry from "../../src/infra/di/Registry";
import DatabaseConnection, { PgPromisseAdapter } from "../../src/infra/database/DatabaseConnection";
import Signup from "../../src/application/usecase/Signup";
import { AccountRepositoryDatabase } from "../../src/infra/repository/AccountRepository";
import GetAccount from "../../src/application/usecase/GetAccount";
import sinon from "sinon"

let connection: DatabaseConnection;
let signup: Signup;
let getAccount: GetAccount;

beforeEach(() => {
  connection = PgPromisseAdapter.getInstance();
  Registry.getInstance().provide("databaseConnection", connection);
  const accountDAO = new AccountDAODatabase();
  Registry.getInstance().provide("accountDAO", new AccountDAODatabase());
  Registry.getInstance().provide("accountAssetDAO", new AccountAssetDAODatabase());
  Registry.getInstance().provide("accountRepository", new AccountRepositoryDatabase());
  signup = new Signup();
  getAccount = new GetAccount();
  
});

test("Deve criar uma conta", async () => {
  const account = {
    name: "John Doe",
    email: "john.doe@example.com",
    document: "97456321558",
    password: "asdQWE123"
  }

  const outputSignup = await signup.execute(account);
  const outputGetAccount = await getAccount.execute(outputSignup.accountId);
  expect(outputGetAccount.accountId).toBeDefined();
  expect(outputGetAccount.name).toBe(account.name);
  expect(outputGetAccount.email).toBe(account.email);
  expect(outputGetAccount.document).toBe(account.document);
  expect(outputGetAccount.password).toBe(account.password);
});

test("Deve criar uma conta com spy", async () => {
  const saveSpy = sinon.spy(AccountDAODatabase.prototype, "save");
  const getAccountByIdSpy = sinon.spy(AccountDAODatabase.prototype, "getById");
  const account = {
    name: "John Doe",
    email: "john.doe@example.com",
    document: "97456321558",
    password: "asdQWE123",
  };

  const outputSignup = await signup.execute(account);
  const outputGetAccount = await getAccount.execute(outputSignup.accountId);
  expect(outputSignup.accountId).toBeDefined();
  expect(outputGetAccount.name).toBe(account.name);
  expect(outputGetAccount.email).toBe(account.email);
  expect(outputGetAccount.document).toBe(account.document);
  expect(outputGetAccount.password).toBe(account.password);
  expect(saveSpy.calledOnce).toBeTruthy();
  expect(getAccountByIdSpy.calledWith(outputSignup.accountId)).toBeTruthy();
  saveSpy.restore();
  getAccountByIdSpy.restore();
});

test("Deve criar uma conta com mock", async () => {
  const accountDAOMock = sinon.mock(AccountDAODatabase.prototype);
  accountDAOMock.expects("save").once().resolves();
  const account = {
    name: "John Doe",
    email: "john.doe@example.com",
    document: "97456321558",
    password: "asdQWE123",
  };
  accountDAOMock.expects("getById").once().resolves(account);
  const outputSignup = await signup.execute(account);
  const outputGetAccount = await getAccount.execute(outputSignup.accountId);
  expect(outputSignup.accountId).toBeDefined();
  expect(outputGetAccount.name).toBe(account.name);
  expect(outputGetAccount.email).toBe(account.email);
  expect(outputGetAccount.document).toBe(account.document);
  expect(outputGetAccount.password).toBe(account.password);
  accountDAOMock.verify();
  accountDAOMock.restore();
});

test("Deve criar uma conta com fake", async () => {
  const accountDAO = new AccountDAOMemory();
  Registry.getInstance().provide("accountDAO", accountDAO);
  const account = {
    name: "John Doe",
    email: "john.doe@example.com",
    document: "97456321558",
    password: "asdQWE123",
  };

  const outputSignup = await signup.execute(account);
  const outputGetAccount = await getAccount.execute(outputSignup.accountId);
  expect(outputSignup.accountId).toBeDefined();
  expect(outputGetAccount.name).toBe(account.name);
  expect(outputGetAccount.email).toBe(account.email);
  expect(outputGetAccount.document).toBe(account.document);
  expect(outputGetAccount.password).toBe(account.password);
});

afterEach(async () => {
  const connection = PgPromisseAdapter.getInstance();
  await connection.query(
    "TRUNCATE ccca.account_asset RESTART IDENTITY CASCADE",
    []
  );
  await connection.query("TRUNCATE ccca.account RESTART IDENTITY CASCADE", []);
});

afterAll(async () => {
  await connection.close();
});