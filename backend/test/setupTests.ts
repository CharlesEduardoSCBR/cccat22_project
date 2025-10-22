import { connection } from '../src/app';

beforeAll(async () => {
  await connection.query("TRUNCATE ccca.account RESTART IDENTITY CASCADE");
});

jest.setTimeout(10000)