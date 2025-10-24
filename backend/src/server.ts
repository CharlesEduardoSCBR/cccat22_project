import dotenv from "dotenv";

if (process.env.NODE_ENV !== 'test') {
    const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
    dotenv.config({ path: envFile });
}

const PORT = parseInt(process.env.PORT || "3000");
const HOST = process.env.HOST || "0.0.0.0";

import app from "./api";

const server = app.listen(PORT, HOST, () => {
    console.log(`🚀 SERVER`);
    console.log(`🚀 Servidor rodando em http://${HOST}:${PORT}`);
    console.log(`📦 Ambiente: ${process.env.NODE_ENV || "development"}`);
    console.log(`🗄️  Database: ${process.env.DATABASE_URL}`);
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM recebido, fechando servidor...");
  server.close(() => {
    console.log("✅ Servidor fechado");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("👋 SIGINT recebido, fechando servidor...");
  server.close(() => {
    console.log("✅ Servidor fechado");
    process.exit(0);
  });
});

export default server;