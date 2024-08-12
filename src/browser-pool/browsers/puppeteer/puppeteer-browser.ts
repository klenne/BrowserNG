import { Browser } from "../browser";
import puppeteer, { Browser as PuppeteerBrowserType, PuppeteerLaunchOptions } from "puppeteer";
import { Page } from "../page";
import { PuppeteerPage } from "./puppeteer-page";
import { browserEngineType } from "../../browser-engine-type";

export class PuppeteerBrowser implements Browser {
  private options?: PuppeteerLaunchOptions;
  private browser!: PuppeteerBrowserType;
  private ppType: browserEngineType | string;
  
  constructor(ppType?: string, options?: PuppeteerLaunchOptions) {
    this.options = options;
    this.ppType = ppType ? ppType : "chrome";
  }

  async launch(): Promise<void> {
    this.browser = await puppeteer.launch(this.options);
  }
  async newPage(): Promise<Page> {
    const page = await this.browser.newPage();
    return new PuppeteerPage(page);
  }

  getPuppeteer(): PuppeteerBrowserType {
    return this.browser;
  }
  getPlaywright(): any {
    return undefined;
  }
  getEngine(): string {
    return  this.ppType;
  }
  async close(): Promise<void> {
    await this.browser?.close();
  }
}
