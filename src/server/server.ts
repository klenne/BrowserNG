// src/server.ts
import express, { Application } from "express";
import { CodeRunnerRouter } from "./routes/code-runner-router";
import { CodeRunnerService } from "../service/code-runner/code-runner-service";

class Server {
  private app: Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use("/api/v1", new CodeRunnerRouter(new CodeRunnerService()).getRouter());
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

export default Server;
