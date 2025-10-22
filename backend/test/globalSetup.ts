import http from 'http';

export default async function globalSetup() {
  console.log("🚀 INICIANDO SERVIDOR GLOBAL DE TESTE...");

  const server: http.Server = await new Promise((resolve) => {
    const s = app.listen(3000, () => {
      console.log("✅ Servidor pronto na porta 3000");
      // Resolve a Promise *apenas* no callback do listen
      resolve(s);
    });
  });

  // @ts-ignore
  global.__SERVER__ = server;
}