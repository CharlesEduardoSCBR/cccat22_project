import GetAccount from "./application/usecase/GetAccount";
import Signup from "./application/usecase/Signup";
import AccountController from "./infra/controller/AccountController";
import { AccountAssetDAODatabase } from "./infra/dao/AccountAssetDAO";
import { AccountDAODatabase } from "./infra/dao/AccountDAO";
import Registry from "./infra/di/Registry";
import { PgPromisseAdapter } from "./infra/database/DatabaseConnection";
import { ExpressAdapter } from "./infra/http/HttpServer";
import { AccountRepositoryDatabase } from "./infra/repository/AccountRepository";
import { OrderRepositoryDatabase } from "./infra/repository/OrderRepository";
import { MediatorMemory } from "./infra/mediator/Mediator";
import ExecuteOrder from "./application/usecase/ExecuteOrder";

// entrypoint da aplicação
export async function createApp() {
  const PORT = parseInt(process.env.PORT || "3001");
  const httpServer = new ExpressAdapter();
  Registry.getInstance().provide("databaseConnection", PgPromisseAdapter.getInstance());
  Registry.getInstance().provide("accountDAO", new AccountDAODatabase());
  Registry.getInstance().provide("accountAssetDAO", new AccountAssetDAODatabase());
  Registry.getInstance().provide("accountRepository", new AccountRepositoryDatabase());
  Registry.getInstance().provide("httpServer", httpServer);
  Registry.getInstance().provide("signup", new Signup());
  Registry.getInstance().provide("getAccount", new GetAccount());
  Registry.getInstance().provide("orderRepository", new OrderRepositoryDatabase());
  const executeOrder = new ExecuteOrder();
  const mediator = new MediatorMemory();
  Registry.getInstance().provide("mediator", mediator);
  mediator.register("orderPlaced", async (event: any) => {
    await executeOrder.execute(event.marketId);
  });
  new AccountController();
  return httpServer;
}
