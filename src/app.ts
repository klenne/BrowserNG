import { BrowserPool } from "./browser-pool/browser-pool";
import Server from "./server/server";

const port = 3000;

const server = new Server(port);
new Promise(async (resolve) => {
 // await BrowserPool.fillPool();
  resolve(1);
}).then(() => {
  server.start();
});
