import { connection } from "../src/app";

export default async function globalTeardown() {
  await new Promise<void>((resolve) => {
    console.log("🛑 FINALIZANDO SERVIDOR GLOBAL DE TESTE");
    // @ts-ignore
    const server = global.__SERVER__;
    if (server) {
      server.close(() => {
        console.log("✅ Servidor finalizado");
        resolve();
      });
    } else {
      resolve();
    }
  });

  await connection.$pool.end();
}
