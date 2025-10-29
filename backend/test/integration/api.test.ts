import axios from "axios";

const BASEURL = `${process.env.URL_BASE || "http://localhost"}:${process.env.PORT || 3001}`;
const api = axios.create({ baseURL: BASEURL });

api.defaults.validateStatus = () => true;

test("deve verificar se o servidor está rodando", async () => {
  const response = await api.get("/health");
  expect(response.status).toBe(200);
  expect(response.data).toMatchObject({
    status: "ok",
    environment: "test",
  });
});

test("Deve criar uma conta", async () => {
  const input = {
    name: "John Doe",
    email: "john.doe@gmail.com",
    document: "97456321558",
    password: "asdQWE123",
  };

  const responseSignup = await axios.post(`${BASEURL}/signup`, input);
  const outputSignup = responseSignup.data;
  const responseGetAccount = await axios.get(`${BASEURL}/accounts/${outputSignup.accountId}`);
  const outputGetAccount = responseGetAccount.data;
  expect(outputSignup.accountId).toBeDefined();
  expect(outputGetAccount.name).toBe(input.name);
  expect(outputGetAccount.email).toBe(input.email);
  expect(outputGetAccount.document).toBe(input.document);
  expect(outputGetAccount.password).toBe(input.password);
});

test("Não deve criar uma conta se o nome for inválido", async () => {
  const input = {
    name: "John",
    email: "john.doe@gmail.com",
    document: "97456321558",
    password: "asdQWE123",
  };

  try {
    const responseSignup = await axios.post(`${BASEURL}/signup`, input);
  } catch (e: any) {
    expect(e.response.status).toBe(422);
    expect(e.response.data.error).toBe("Nome inválido");
  }
});