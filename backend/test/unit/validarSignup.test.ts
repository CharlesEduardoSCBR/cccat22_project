import { validateSignup } from "../../src/domain/validateSignup";

test.each([
  ["Leonardo da Vinci", true],
  ["Leonardo", false],
])("Deve testar o nome da conta: %", (nome, esperado) => {
  const resultado = validateSignup.validarNome(nome);
  expect(resultado).toBe(esperado);
});
/*
test.each([
  ["leonardoDaVinci@gmail.com", false],
  ["leoVinci@gmail.com", false],
  ["leoVinci@", false]
])("Deve testar o email da conta: %", async (email, esperado) => {
  const resultado = await validateSignup.validarEmail(email);
  expect(resultado).toBe(esperado);
});
*/
test.each([
  ["Senha123", true],
  ["senha123", false],
  ["SENHA123", false],
  ["senha!23", false],
  ["Senh1", false]
])("Deve testar a senha da conta: %", (senha, esperado) => {
  const resultado = validateSignup.validarPassword(senha);
  expect(resultado).toBe(esperado);
});