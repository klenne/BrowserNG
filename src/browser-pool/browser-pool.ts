import { Browser } from "./browsers/browser";
import { browserEngineType } from "./browser-engine-type";
import { PuppeteerBrowser } from "./browsers/puppeteer/puppeteer-browser";
import { PlaywrightBrowser } from "./browsers/playwright/playwright-browser";

interface BrowserInstance {
  name: string;
  browser: Browser;
}

export class BrowserPool {
  private static browsers: Browser[] = [];
  private static instances: BrowserInstance[] = [
    {
      name: "chrome",
      browser: new PuppeteerBrowser("chrome", {
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-infobars",
          "--window-position=0,0",
          "--ignore-certificate-errors",
          "--ignore-certificate-errors-spki-list",
        ],
        ignoreDefaultArgs: ["--enable-automation"],
      }),
    },
    {
      name: "chrome-headfull",
      browser: new PuppeteerBrowser("chrome-headfull", {
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-infobars",
          "--window-position=0,0",
          "--ignore-certificate-errors",
          "--ignore-certificate-errors-spki-list",
        ],
        ignoreDefaultArgs: ["--enable-automation"],
        headless: false,
      }),
    },
    {
      name: "firefox",
      browser: new PlaywrightBrowser("firefox"),
    },
    {
      name: "firefox",
      browser: new PlaywrightBrowser("safari"),
    },
  ];

  static async fillPool() {
    for (let browserInstance of BrowserPool.instances) {
      if (!BrowserPool.browsers.find((browser) => browser.getEngine() === browserInstance.name)) {
        await this.push(browserInstance.browser);
      }
    }
  }
  
  static async push(browser: Browser) {
    await browser.launch();
    BrowserPool.browsers.push(browser);
  }
  static async getBrowser(type: browserEngineType | string) {
    await BrowserPool.fillPool();
    var instance = BrowserPool.browsers.find(
      (browserInstance) => browserInstance.getEngine() === type
    );

    if (!instance) {
      throw new Error("Unknown Browser type");
    }
    return instance;
  }
}
