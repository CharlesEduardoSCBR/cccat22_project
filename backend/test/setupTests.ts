import { HttpStatusCode } from 'axios';
import api from '../src/api';
import Http from 'http';

let server: Http.Server;

beforeAll(async () => {
  server = api.listen(3000)
  //await connection.query("TRUNCATE ccca.account RESTART IDENTITY CASCADE");
});

afterAll((done) => {
  server.close(() => {
    console.log("Servidor de teste finalizado");
    done();
  });
});

jest.setTimeout(10000)