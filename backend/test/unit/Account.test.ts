import Signup from "../../src/application/usecase/Signup";
import signup from "../../src/application/usecase/Signup";
import Account from "../../src/domain/Account"
import { inject } from "../../src/infra/di/Registry";
import { AccountRepositoryDatabase } from "../../src/infra/repository/AccountRepository";

test("Deve far um saque", () => {
  const account = Account.create("John Doe","john.doe@gmail.com","97456321558","asdQWE123");
  account.deposit("USD", 500);
  account.withdraw("USD", 100);
  expect(account.balances[0].quantity).toBe(400);
})