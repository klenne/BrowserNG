export interface Page {
  goto(url: string): Promise<void>;
  click(selector: string): Promise<void>;
  type(selector: string, text: string): Promise<void>;
  screenshot(options?: { path?: string }): Promise<void>;
  title(): Promise<string>;
  close(): Promise<void>;

  onRequest(handler: (request: any) => void): void;
  waitForSelector(selector: string): Promise<void>;
  waitForTimeout(timeout: number): Promise<void>;
  evaluate<R>(pageFunction: (...args: any[]) => R | Promise<R>, ...args: any[]): Promise<R>;

}
