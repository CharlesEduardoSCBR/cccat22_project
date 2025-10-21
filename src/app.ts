import express from "express";
import crypto from "crypto";
import { Request, Response } from "express";
import pgp from "pg-promise";

const connection = pgp()("postgres://postgres:123@db:5432/app");
const app = express();

app.use(express.json());
app.post("/signup", async (req:Request, res:Response) => {
    const accountId = crypto.randomUUID();

    try {
        await connection.query(
          "INSERT INTO ccca.account (id, name, email, document, password) VALUES ($1, $2, $3, $4, $5)",
          [
            accountId,
            req.body.name,
            req.body.email,
            req.body.document,
            req.body.password,
          ]
        );
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar conta" });
        return;
    }
    res.json({ accountId });
});
app.get("/accounts/:accountId", async (req: Request, res: Response) => {
  const [account] = await connection.query(
    "SELECT * FROM ccca.account WHERE id = $1", [req.params.accountId]
  );

  res.json(account);
});
app.get("/accountsByEmail/:email", async (req: Request, res: Response) => {
  const [account] = await connection.query(
    "SELECT count(1) AS hasEmail FROM ccca.account WHERE email = $1",
    [req.params.email]
  );

  const hasemail = parseInt(account.hasemail) > 0 ? 1 : 0;
  res.json({ hasemail });
});

export default app;