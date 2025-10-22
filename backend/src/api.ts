import express, { Request, Response } from "express";
import cors from "cors";
import { AccountDAODatabase } from "./AccountDAO";
import AccountService from "./AccountService";

const app = express();
app.use(express.json());
app.use(cors());

const accountDAO = new AccountDAODatabase();
const accountService = new AccountService(accountDAO);

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

export default app;