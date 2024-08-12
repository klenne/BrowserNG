import {
  Browser as playwrightBrowser,
  BrowserType,
  LaunchOptions,
  chromium,
  firefox,
  webkit,
} from "playwright";
import { browserEngineType } from "../../browser-engine-type";
import { Browser } from "../browser";
import { PlaywrightPage } from "./playwright-page";
import { Page } from "../page";

export class PlaywrightBrowser implements Browser {
  private browserTp: BrowserType;
  private options?: LaunchOptions;
  private browser!: playwrightBrowser;
  private engine: string | browserEngineType;

  constructor(engine: string | browserEngineType, options?: LaunchOptions) {
    this.engine = engine;
    switch (engine) {
      default:
        this.browserTp = chromium;
      case "safari":
        this.browserTp = webkit;
      case "firefox":
        this.browserTp = firefox;
    }
    this.options = options;
  }
  getPuppeteer(): any {
    return undefined;
  }

  getPlaywright(): playwrightBrowser {
    return this.browser;
  }

  async launch(): Promise<void> {
    this.browser = await this.browserTp.launch(this.options);
  }
  async newPage(): Promise<Page> {
    const page = await this.browser.newPage();
    return new PlaywrightPage(page);
  }
  getEngine(): string | browserEngineType {
    return this.engine;
  }


  async close(): Promise<void> {
    await this.browser?.close();
  }
}
