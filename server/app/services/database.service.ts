import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
@injectable()
export class DatabaseService {
 private pool: pg.Pool;

  constructor() {
    const connectionConfig = {
      user: "postgres",
      database: "TP4",
      password: "TP4",
      port: 5432,
      host: "127.0.0.1",
      keepAlive: true
    };
    this.pool = new pg.Pool(connectionConfig);
  }

  public async connect() {
    this.pool.connect((err, client, done) => {
      if (err) {
        console.error('Connection error', err.stack);
        return;
      }
      console.log('Connected to database');
      done();
    });
  }

  public async query(sql: string, params?: any[]): Promise<any> {
    try {
      const client = await this.pool.connect();
      const res = await client.query(sql, params);
      client.release();
      if (sql.trim().toLowerCase().startsWith("select")) {
        return res.rows;
      } else {
        return res.rowCount;
      }
    } catch (err) {
      console.error(err.stack);
      throw err; 
    }
  }
  
}
