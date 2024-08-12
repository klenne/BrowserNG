import { browserEngineType } from "../../browser-pool/browser-engine-type";

export interface CodeRunnerResponse {
    response: string;
    engine: browserEngineType;
  }
  