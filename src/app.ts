import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { applicationRouter } from './router';

export class Application {
  private _server: Express;
  constructor() {
    this._server = express();
    this._server.set('host', 'localhost');
    this._server.set('port', 8000);
    this._server.use(bodyParser.json());
    this._server.use(bodyParser.urlencoded({ extended: true }));
    this._server.use(cors());
    this._server.use(applicationRouter);
  }

  public startServer(): void {
    const host: string = this._server.get('host');
    const port: number = this._server.get('port');
    this._server.listen(port, host, () => {
      console.log(`Server started at http://${host}:${port}`);
    });
  }

  get server() {
    return this._server;
  }
}
