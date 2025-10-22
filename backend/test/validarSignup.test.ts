import { validateSignup } from "../src/validateSignup";

test.each([
  ["Leonardo da Vinci", true],
  ["Leonardo", false],
])("Deve testar o nome da conta: %", (nome, esperado) => {
  const resultado = validateSignup.validarNome(nome);
  expect(resultado).toBe(esperado);
});

test.each([
  ["leonardoDaVinci@gmail.com", false],
  ["leoVinci@gmail.com", false],
  ["leoVinci@", false]
])("Deve testar o email da conta: %", async (email, esperado) => {
  const resultado = await validateSignup.validarEmail(email);
  console.log(resultado + " " + email + " " + esperado);
  expect(resultado).toBe(esperado);
});