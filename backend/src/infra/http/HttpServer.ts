import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";

export default interface HttpServer {
  route(method: string, url: string, callback: Function): void;
  listen(port: number): void;
}

export class ExpressAdapter implements HttpServer {
  app: any;
  PORT: any;
  HOST: string;

  constructor() {
    if (process.env.NODE_ENV !== 'test') {
        const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
        dotenv.config({ path: envFile });
    }
    
    this.PORT = parseInt(process.env.PORT || "3001");
    this.HOST = process.env.HOST || "0.0.0.0";

    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
  }

  route(method: string, url: string, callback: Function): void {
    this.app[method](url, async (req: Request, res: Response) => {
      const params = req.params;
      const body = req.body;
      try {
        const output = await callback(params, body);
        res.json(output);
      } catch (error: any) {
        res.status(422).json({ error: error.message });
      }
    });
  }

  listen(port: number): any {
    const server = this.app.listen(port, this.HOST);
    return server;

  }
}
