import { createApp } from '../src/api';
import Http from 'http';

let server: Http.Server;

beforeAll(async () => {
  console.log(`${process.env.NODE_ENV} | ${process.env.PORT} | ${process.env.DATABASE_URL}} 
      | ${process.env.HOST} 
      | ${process.env.NODE_ENV === 'test' ? 'Loading test environment variables' : 'Not loading test environment variables'}`);
  const testPort = parseInt(process.env.TEST_PORT || "3001");
  const api = createApp();
  
  console.log("Iniciando servidor de teste...");
  console.log(`Porta: ${testPort}`);
  console.log(`Database: ${process.env.DATABASE_URL}`);
  
  await new Promise<void>((resolve, reject) => {
    server = api.listen(testPort, "0.0.0.0", () => {
      console.log("✅ Servidor de teste pronto!");
      resolve();
    });

    server.on("error", (error: any) => {
      if (error.code === "EADDRINUSE") {
        console.error(`Porta ${testPort} já está em uso!`);
      } else {
        console.error("Erro ao iniciar servidor:", error);
      }
      reject(error);
    });
  });
});

afterAll(async () => {
  console.log("Finalizando servidor de teste...");

  await new Promise<void>((resolve) => {
    server.close(() => {
      console.log("Servidor finalizado");
      resolve();
    });
  });
});

jest.setTimeout(10000)