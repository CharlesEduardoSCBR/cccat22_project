import axios from "axios";
import { Server } from "http";
import app from "../src/app";

let server: Server;

beforeAll((done) => {
    server = app.listen(3000, () => {
        done();
    });
});

test("Deve criar uma conta", async () => {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "97456321558",
        password: "senha123",
    };
    const response = await axios.post("http://localhost:3000/signup", input);
    expect(response.status).toBe(200);
    expect(response.data.accountId).toBeDefined();

    const responseGetAccount = await axios.get(`http://localhost:3000/accounts/${response.data.accountId}`);
    expect(responseGetAccount.status).toBe(200);
    expect(responseGetAccount.data.name).toBe(input.name);
    expect(responseGetAccount.data.email).toBe(input.email);
    expect(responseGetAccount.data.document).toBe(input.document);
    expect(responseGetAccount.data.password).toBe(input.password);
});

afterAll((done) => {
  server.close(() => {
    done();
  });
});