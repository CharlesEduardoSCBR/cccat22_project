import { createApp } from "../src/api";

let server: any;

beforeAll(async () => {
  const PORT = parseInt(process.env.PORT || "3001");
  const httpServer = await createApp();
  server = httpServer.listen(PORT);
  console.log(`🚀 Servidor de teste rodando na porta ${PORT}`);
});

afterAll(async () => {
  if (server) {
    server.close(() => {
      console.log("🛑 Servidor de teste finalizado");
    });
  }
});
