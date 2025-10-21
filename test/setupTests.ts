import { Server } from "http";
import app from "../src/app";

let server: Server;

beforeAll((done) => {
    console.log("============ INICIANDO SERVIDOR DE TESTE ==============");
  server = app.listen(3000, () => {
    done();
  });
});

afterAll((done) => {
     console.log("============ FINALIZANDO SERVIDOR DE TESTE ==============");
  server.close(() => {
    done();
  });
});

export { server };