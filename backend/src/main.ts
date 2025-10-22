import express, { Request, Response } from "express";

const app = express();

app.post("/signup", async (req:Request, res:Response) => {
    res.end();
})

app.post("/accounts/:accountId", async (req: Request, res: Response) => {
  const accountId = req.params.accountId;
  res.json({ accountId });
});
app.listen(3000);