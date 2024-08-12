import { Page as PuppeteerPageType } from "puppeteer";
import { Page } from "../page";

export class PuppeteerPage implements Page {
  constructor(private page: PuppeteerPageType) {}

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async click(selector: string): Promise<void> {
    await this.page.click(selector);
  }

  async type(selector: string, text: string): Promise<void> {
    await this.page.type(selector, text);
  }

  async screenshot(options?: { path?: string }): Promise<void> {
    await this.page.screenshot(options);
  }

  async title(): Promise<string> {
    return this.page.title();
  }

  async close(): Promise<void> {
    await this.page.close();
  }

  onRequest(handler: (request: any) => void): void {
    this.page.on("request", handler);
  }

  async waitForSelector(selector: string): Promise<void> {
    await this.page.waitForSelector(selector);
  }

  async waitForTimeout(timeout: number): Promise<void> {
    await this.delay(timeout);
  }

  async evaluate<R>(pageFunction: (...args: any[]) => R | Promise<R>, ...args: any[]): Promise<R> {
    return this.page.evaluate(pageFunction, ...args);
  }

  delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
