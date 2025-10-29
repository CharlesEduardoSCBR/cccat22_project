import { AccountDAODatabase, AccountDAOMemory } from "../../src/infra/dao/AccountDAO";
import AccountService from "../../src/application/service/AccountService";
import { AccountAssetDAODatabase } from "../../src/infra/dao/AccountAssetDAO"; 
import sinon from "sinon";
import Registry from "../../src/infra/di/Registry";
import DatabaseConnection, { PgPromisseAdapter } from "../../src/infra/database/DatabaseConnection";

let connection: DatabaseConnection;
let accountService: AccountService;

beforeEach(() => {
  connection = PgPromisseAdapter.getInstance();
  Registry.getInstance().provide("databaseConnection", connection);
  const accountDAO = new AccountDAODatabase();
  Registry.getInstance().provide("AccountDAO", new AccountDAODatabase());
  Registry.getInstance().provide("AccountAssetDAO", new AccountAssetDAODatabase());
  accountService = new AccountService();
});

test("Deve criar uma conta", async () => {
  const account = {
    name: "John Doe",
    email: "john.doe@example.com",
    document: "97456321558",
    password: "asdQWE123"
  }

  const outputSignup = await accountService.signup(account);
  const outputGetAccount = await accountService.getAccountById(outputSignup.accountId);
  //console.log(outputGetAccount);
  expect(outputGetAccount.account_id).toBeDefined();
  expect(outputGetAccount.name).toBe(account.name);
  expect(outputGetAccount.email).toBe(account.email);
  expect(outputGetAccount.document).toBe(account.document);
  expect(outputGetAccount.password).toBe(account.password);
});

test("Deve criar uma conta com stub", async () => {
  const saveStub = sinon.stub(AccountDAODatabase.prototype, "save").resolves();
  const account = {
    name: "John Doe",
    email: "john.doe@example.com",
    document: "97456321558",
    password: "asdQWE123",
  };

  const getAccountByIdStub = sinon.stub(AccountDAODatabase.prototype, "getById").resolves(account);
  const outputSignup = await accountService.signup(account);
  const outputGetAccount = await accountService.getAccountById(outputSignup.accountId);
  expect(outputGetAccount.accountId).toBeDefined();
  expect(outputGetAccount.name).toBe(account.name);
  expect(outputGetAccount.email).toBe(account.email);
  expect(outputGetAccount.document).toBe(account.document);
  expect(outputGetAccount.password).toBe(account.password);
  saveStub.restore();
  getAccountByIdStub.restore();
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

  const outputSignup = await accountService.signup(account);
  const outputGetAccount = await accountService.getAccountById(outputSignup.accountId);
  expect(outputGetAccount.account_id).toBeDefined();
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
  const outputSignup = await accountService.signup(account);
  const outputGetAccount = await accountService.getAccountById(outputSignup.accountId);
  expect(outputGetAccount.accountId).toBeDefined();
  expect(outputGetAccount.name).toBe(account.name);
  expect(outputGetAccount.email).toBe(account.email);
  expect(outputGetAccount.document).toBe(account.document);
  expect(outputGetAccount.password).toBe(account.password);
  accountDAOMock.verify();
  accountDAOMock.restore();
});

test("Deve criar uma conta com fake", async () => {
  const accountDAO = new AccountDAOMemory();
  Registry.getInstance().provide("AccountDAO", accountDAO);
  const accountService = new AccountService();
  const account = {
    name: "John Doe",
    email: "john.doe@example.com",
    document: "97456321558",
    password: "asdQWE123",
  };

  const outputSignup = await accountService.signup(account);
  const outputGetAccount = await accountService.getAccountById(
    outputSignup.accountId
  );
  //console.log(outputGetAccount);
  expect(outputGetAccount.accountId).toBeDefined();
  expect(outputGetAccount.name).toBe(account.name);
  expect(outputGetAccount.email).toBe(account.email);
  expect(outputGetAccount.document).toBe(account.document);
  expect(outputGetAccount.password).toBe(account.password);
});

test("Deve depositar em uma conta", async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@gmail.com",
    document: "97456321558",
    password: "asdQWE123",
  };
  const outputSignup = await accountService.signup(input);
  const inputDeposit = {
    accountId: outputSignup.accountId,
    assetId: "USD",
    quantity: 1000,
  };
  await accountService.deposit(inputDeposit);
  const outputGetAccount = await accountService.getAccount(outputSignup.accountId);
  expect(outputGetAccount.balances[0].assetId).toBe("USD");
  expect(outputGetAccount.balances[0].quantity).toBe(1000);
});

test("Não deve depositar em uma conta que não existe", async () => {
  const inputDeposit = {
    accountId: crypto.randomUUID(),
    assetId: "USD",
    quantity: 1000,
  };
  await expect(accountService.deposit(inputDeposit)).rejects.toThrow("Account not found");
});

test("Deve sacar de uma conta", async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@gmail.com",
    document: "97456321558",
    password: "asdQWE123"
  };
  const outputSignup = await accountService.signup(input);
  const inputDeposit = {
    accountId: outputSignup.accountId,
    assetId: "USD",
    quantity: 1000,
  };
  await accountService.deposit(inputDeposit);
  const inputWithdraw = {
    accountId: outputSignup.accountId,
    assetId: "USD",
    quantity: 500,
  };
  await accountService.withdraw(inputWithdraw);
  const outputGetAccount = await accountService.getAccount(outputSignup.accountId);
  expect(outputGetAccount.balances[0].assetId).toBe("USD");
  expect(outputGetAccount.balances[0].quantity).toBe(500);
});

test("Não Deve sacar de uma conta", async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@gmail.com",
    document: "97456321558",
    password: "asdQWE123",
  };
  const outputSignup = await accountService.signup(input);
  const inputDeposit = {
    accountId: outputSignup.accountId,
    assetId: "USD",
    quantity: 500,
  };
  await accountService.deposit(inputDeposit);
  const inputWithdraw = {
    accountId: outputSignup.accountId,
    assetId: "USD",
    quantity: 1000,
  };
  await expect(accountService.withdraw(inputWithdraw)).rejects.toThrow("Insuficient funds");
});

afterEach(async () => {
  const connection = PgPromisseAdapter.getInstance();
  await connection.query("TRUNCATE ccca.account_asset RESTART IDENTITY CASCADE", []);
  await connection.query("TRUNCATE ccca.account RESTART IDENTITY CASCADE", []);
});

afterAll(async () => {
  await connection.close();
});