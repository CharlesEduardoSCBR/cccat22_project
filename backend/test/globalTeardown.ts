import { PgPromisseAdapter } from "../src/infra/database/DatabaseConnection";

export default async function globalTeardown() {
  // @ts-ignore
  const server = global.__HTTP_SERVER__;
  
  console.log("🛑 Iniciando e FINALIZANDO SERVIDOR GLOBAL DE TESTE");
  if (server) {    
    await new Promise<void>((resolve) => {
      resolve();
    });

  } else {
    console.log("⚠️  Nenhum servidor para fechar");
  };


  const connection = PgPromisseAdapter.getInstance();
  await connection.close();
  console.log("✅ Conexão com banco fechada");
}
