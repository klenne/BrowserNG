import { browserEngineType } from "../../browser-pool/browser-engine-type";

export interface CodeRunnerRequest {
  script: string;
  engine: browserEngineType;
}
