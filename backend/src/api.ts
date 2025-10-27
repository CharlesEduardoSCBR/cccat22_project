import express, { Request, Response } from "express";
import cors from "cors";
import { AccountDAODatabase } from "./AccountDAO";
import AccountService from "./AccountService";
import Registry from "./Registry";

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(cors());

  const accountDAO = new AccountDAODatabase();
  Registry.getInstance().provide("AccountDAO", accountDAO);
  Registry.getInstance().provide("AccountAssetDAO", new AccountDAODatabase())
  const accountService = new AccountService();

  app.get("/health", (req: Request, res: Response) => {
    res.json({
      status: "ok",
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
    });
  });

  app.post("/signup", async (req: Request, res: Response) => {
    const account = req.body;
    try {
      const output = await accountService.signup(account);
      res.json(output);
    } catch (error: any) {
      res.status(422).json({ message: error.message });
    }
  });

  app.get("/accounts/:accountId", async (req: Request, res: Response) => {
    const accountId = req.params.accountId;
    const output = await accountService.getAccountById(accountId);
    res.json(output);
  });

  return app;
}

