import { browserEngineType } from "../browser-engine-type";
import { Page } from "./page";
import { Browser as PuppeteerBrowserType } from "puppeteer";
import { Browser as PlaywrightBrowserType } from "playwright";

export interface Browser {
  launch(): Promise<void>;
  newPage(): Promise<Page>;
  getEngine(): string | browserEngineType;
  close(): Promise<void>;
  getPuppeteer(): PuppeteerBrowserType;
  getPlaywright(): PlaywrightBrowserType;


}
