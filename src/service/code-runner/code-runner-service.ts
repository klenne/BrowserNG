import { BrowserPool } from "../../browser-pool/browser-pool";
import { CodeRunnerRequest } from "../../model/code-runner/code-runner-request";
import { CodeRunnerResponse } from "../../model/code-runner/code-runner-response";
import { Service } from "../service";

export class CodeRunnerService implements Service<CodeRunnerRequest, CodeRunnerResponse> {
  
  async run(request: CodeRunnerRequest): Promise<CodeRunnerResponse> {
    let browser = await BrowserPool.getBrowser(request.engine);
    let page = await browser?.newPage();
    try {
      let result = await page?.evaluate((script) => {
        return eval(script);
      }, request.script);

      return { result: result, engine: browser?.getEngine() } as unknown as CodeRunnerResponse;
    } catch (error) {
      throw error;
    } finally {
      await page?.close();
    }
  }
}
