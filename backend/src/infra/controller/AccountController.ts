import AccountService from "../../application/service/AccountService";
import HttpServer from "../http/HttpServer";
import { inject } from "../di/Registry";
import Signup from "../../application/usecase/Signup";
import GetAccount from "../../application/usecase/GetAccount";

export default class AccountController {
  @inject("httpServer")
  httpServer!: HttpServer;
  @inject("signup")
  signup!: Signup;
  @inject("getAccount")
  getAccount!: GetAccount;

  constructor() {
    this.httpServer.route("get", "/health", async (params: any, body: any) => {
      return {
        status: "ok",
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString(),
      };
    });
    this.httpServer.route("post", "/signup", async (params: any, body: any) => {
      const output = await this.signup.execute(body);
      return output;
    });
    this.httpServer.route("get", "/accounts/:accountId", async (params: any, body: any) => {
      console.log(`🎯 Controller: GET /accounts/:accountId chamado`);
      console.log(`   params:`, params);
      console.log(`   accountId:`, params.accountId);

      try {
        console.log(`📞 Chamando getAccount.execute()...`);
        const output = await this.getAccount.execute(params.accountId);
        console.log(`✅ getAccount.execute() retornou:`, output);
        return output;
      } catch (error: any) {
        console.error(`💥 ERRO no controller:`, error);
        console.error(`   Message:`, error.message);
        console.error(`   Stack:`, error.stack);
        throw error;
      }
    });
  }
}