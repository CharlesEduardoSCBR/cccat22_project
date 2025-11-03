import { createApp } from "../src/api";
import dotenv from "dotenv"

export default async function globalSetup() {
  dotenv.config({path: '.env.test'});
  process.env.NODE_ENV = "test";
  console.log("🚀 INICIANDO SERVIDOR GLOBAL DE TESTE...");

  const PORT = parseInt(process.env.PORT || "3001");
  const httpServer = await createApp();
  const server  = httpServer.listen(PORT);
  await new Promise<void>((resolve) => {
    server.on('listening', () => {
      // @ts-ignore
      global.__HTTP_SERVER__ = httpServer;
      resolve();
    })
  })
}