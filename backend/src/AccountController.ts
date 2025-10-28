import AccountService from "./AccountService";
import HttpServer from "./HttpServer";
import { inject } from "./Registry";

export default class AccountController {
  @inject("httpServer")
  httpServer!: HttpServer;
  @inject("accountService")
  accountService!: AccountService;

  constructor() {
    this.httpServer.route("get", "/health", async (params: any, body: any) => {
      return {
        status: "ok",
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString(),
      };
    });
    this.httpServer.route("post", "/signup", async (params: any, body: any) => {
      return await this.accountService.signup(body);
    });

    this.httpServer.route("get", "/accounts/:accountId", async (params: any, body: any) => {
      return await this.accountService.getAccountById(params.accountId);
    });
  }
}