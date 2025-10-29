import pgp from "pg-promise";

export default interface DatabaseConnection {
  query(statment: string, params: any[]): Promise<any>;
  close(): Promise<void>;
}

export class PgPromisseAdapter implements DatabaseConnection {
  private static instance: PgPromisseAdapter | null = null;
  private connection: any;

  private constructor(
    connectionString: string = process.env.DATABASE_URL ||"postgres://postgres:123@db:5432/app") {
    this.connection = pgp()(connectionString);
  }
  public static getInstance(): PgPromisseAdapter {
    if (!PgPromisseAdapter.instance) {
      PgPromisseAdapter.instance = new PgPromisseAdapter();
    }
    return PgPromisseAdapter.instance;
  }
  public static resetInstance(): void {
    if (PgPromisseAdapter.instance) {
      PgPromisseAdapter.instance.close();
      PgPromisseAdapter.instance = null;
    }
  }
  async query(statment: string, params: any[]): Promise<any> {
    return this.connection.query(statment, params);
  }

  async close(): Promise<void> {
    await this.connection.$pool.end();
  }
}

export function getConnection(): DatabaseConnection {
  return PgPromisseAdapter.getInstance();
}