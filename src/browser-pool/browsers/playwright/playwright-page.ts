import { Browser as PlaywrightBrowserType, Page as PlaywrightPageType } from "playwright";

import { Page } from "../page";

export class PlaywrightPage implements Page {
  constructor(private page: PlaywrightPageType) {}

  async goto(url: string): Promise<void> {
  
    await this.page.goto(url);
  }

  async click(selector: string): Promise<void> {
    await this.page.click(selector);
  }

  async type(selector: string, text: string): Promise<void> {
    await this.page.fill(selector, text);
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
    await this.page.waitForTimeout(timeout);
  }
  async evaluate<R>(pageFunction: (...args: any[]) => R | Promise<R>, ...args: any[]): Promise<R> {
    return this.page.evaluate(pageFunction, ...args);
  }
}
