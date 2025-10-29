import { validateCpf } from "../../src/domain/validateCpf";

test.each([
  ["97456321558", true],
  ["71428793860", true],
  ["87748248800", true],
  ["1", false],
  ["", false],
  ["11111111111", false],
  ["00000000000", false],
  ["00000000000564", false],
])("Deve testar um cpf: %", (cpf, esperado) => {
  const resultado = validateCpf(cpf);
  expect(resultado).toBe(esperado);
});