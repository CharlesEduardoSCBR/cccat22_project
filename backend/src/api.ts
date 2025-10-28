import { AccountDAODatabase } from "./AccountDAO";
import AccountService from "./AccountService";
import Registry from "./Registry";
import { PgPromisseAdapter } from "./DatabaseConnection";
import { ExpressAdapter } from "./HttpServer";
import AccountController from "./AccountController";

// entrypoint da aplicação
export async function createApp() {
  const PORT = parseInt(process.env.PORT || "3000");
  const httpServer = new ExpressAdapter();
  Registry.getInstance().provide("databaseConnection", PgPromisseAdapter.getInstance());
  Registry.getInstance().provide("AccountDAO", new AccountDAODatabase());
  Registry.getInstance().provide("AccountAssetDAO", new AccountDAODatabase());
  Registry.getInstance().provide("accountService", new AccountService());
  Registry.getInstance().provide("httpServer", httpServer);
  new AccountController();
  return httpServer;
}
