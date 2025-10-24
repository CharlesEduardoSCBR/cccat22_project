import { AccountDAODatabase, AccountDAOMemory } from "../src/AccountDAO";
import AccountService from "../src/AccountService";
import sinon from "sinon";
import Registry from "../src/Registry";

let accountService: AccountService;

beforeEach(() => {
  const accountDAO = new AccountDAODatabase();
  Registry.getInstance().provide("AccountDAO", new AccountDAODatabase());
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
  console.log(outputGetAccount);
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
  console.log(outputGetAccount);
  expect(outputGetAccount.accountId).toBeDefined();
  expect(outputGetAccount.name).toBe(account.name);
  expect(outputGetAccount.email).toBe(account.email);
  expect(outputGetAccount.document).toBe(account.document);
  expect(outputGetAccount.password).toBe(account.password);
});