import { Router, Request, Response } from "express";
import { CodeRunnerRequest } from "../../model/code-runner/code-runner-request";
import { Service } from "../../service/service";
import { CodeRunnerResponse } from "../../model/code-runner/code-runner-response";
import { Routable } from "./router";

export class CodeRunnerRouter implements Routable {
  private service: Service<CodeRunnerRequest, CodeRunnerResponse>;
  constructor(service: Service<CodeRunnerRequest, CodeRunnerResponse>) {
    this.service = service;
  }
  getRouter(): Router {
    const router = Router();

    router.post("/code-runner", async (req: Request, res: Response) => {
      this.service
        .run(req.body)
        .then((result) => {
          res.json(result);
        })
        .catch((error) => {
          res.status(500).json({ error: error.message });
        });
    });

    return router;
  }
}
