import axios from "axios";

test("Deve criar uma conta", async () => {
    const input = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
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
