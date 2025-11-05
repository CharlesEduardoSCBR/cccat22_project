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

test("Deve criar uma conta", function () {
  const account = Account.create(
    "John Doe",
    "john.doe@gmail.com",
    "97456321558",
    "asdQWE123"
  );
  expect(account.getName()).toBe("John Doe");
  expect(account.getEmail()).toBe("john.doe@gmail.com");
  expect(account.getDocument()).toBe("97456321558");
  expect(account.getPassword()).toBe("asdQWE123");
});

test("Não deve criar uma conta com nome inválido", function () {
  expect(() =>
    Account.create("John", "john.doe@gmail.com", "97456321558", "asdQWE123")
  ).toThrow(new Error("Nome inválido"));
});

test("Não deve criar uma conta com email inválido", function () {
  expect(() =>
    Account.create("John Doe", "john.doe@gmail", "97456321558", "asdQWE123")
  ).toThrow(new Error("Email inválido"));
});

test("Não deve criar uma conta com documento inválido", function () {
  expect(() =>
    Account.create("John Doe", "john.doe@gmail.com", "123456", "asdQWE123")
  ).toThrow(new Error("Documento inválido"));
});

test("Não deve criar uma conta com senha inválida", function () {
  expect(() =>
    Account.create("John Doe", "john.doe@gmail.com", "97456321558", "123456")
  ).toThrow(new Error("Senha inválida"));
});