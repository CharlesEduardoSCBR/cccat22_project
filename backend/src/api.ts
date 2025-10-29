import GetAccount from "./application/usecase/GetAccount";
import Signup from "./application/usecase/Signup";
import AccountController from "./infra/controller/AccountController";
import { AccountAssetDAODatabase } from "./infra/dao/AccountAssetDAO";
import { AccountDAODatabase } from "./infra/dao/AccountDAO";
import Registry from "./infra/di/Registry";
import { PgPromisseAdapter } from "./infra/database/DatabaseConnection";
import { ExpressAdapter } from "./infra/http/HttpServer";
import { AccountRepositoryDatabase } from "./infra/repository/AccountRepository";

// entrypoint da aplicação
export async function createApp() {
  const PORT = parseInt(process.env.PORT || "3000");
  const httpServer = new ExpressAdapter();
  Registry.getInstance().provide("databaseConnection", PgPromisseAdapter.getInstance());
  Registry.getInstance().provide("AccountDAO", new AccountDAODatabase());
  Registry.getInstance().provide("AccountAssetDAO", new AccountAssetDAODatabase());
  Registry.getInstance().provide("AccountRepository", new AccountRepositoryDatabase());
  Registry.getInstance().provide("httpServer", httpServer);
  Registry.getInstance().provide("signup", new Signup());
  Registry.getInstance().provide("getAccount", new GetAccount());
  new AccountController();
  return httpServer;
}
