import { PgPromisseAdapter } from "../src/infra/database/DatabaseConnection";

// Limpa o banco após cada arquivo de teste
afterAll(async () => {
  const connection = PgPromisseAdapter.getInstance();
  try {
    await connection.query("TRUNCATE ccca.account_asset RESTART IDENTITY CASCADE",[]);
    await connection.query("TRUNCATE ccca.account RESTART IDENTITY CASCADE",[]);
    console.log("🧹 Banco de dados limpo");
  } catch (error) {
    console.error("❌ Erro ao limpar banco:", error);
  }
});
