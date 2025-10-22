import { AccountDAODatabase, AccountDAOMemory } from "../src/AccountDAO";
import AccountService from "../src/AccountService";

let accountService: AccountService;

beforeEach(() => {
  const accountDAO = new AccountDAOMemory();
  accountService = new AccountService(accountDAO);
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
  expect(outputGetAccount.accountId).toBeDefined();
  expect(outputGetAccount.name).toBe(account.name);
  expect(outputGetAccount.email).toBe(account.email);
  expect(outputGetAccount.document).toBe(account.document);
  expect(outputGetAccount.password).toBe(account.password);
});