import { Application } from "./app";
import serverless from 'serverless-http';


const app = new Application();
app.startServer();

export const handler = serverless(app.server);
