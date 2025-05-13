import { Server } from "http";
import { AddressInfo } from "net";
import express, { Application } from "express";

export class TestExpressAppHandler {
  private server?: Server;
  private app?: Application;

  public start(): Promise<void> {
    if (this.server)
      throw new Error(`You should first call TestExpressAppHandler.stop`);

    return new Promise((resolve) => {
      this.app = express();
      this.server = this.app.listen(() => {
        console.log(`Test express app listening ${this.getServerBaseUrl()}`);
        resolve();
      });
    });
  }

  public stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.server?.close((err) => {
        if (err) return reject(err);
        this.app = undefined;
        this.server = undefined;
        resolve();
      });
    });
  }

  public getApp(): Application {
    if (!this.app)
      throw new Error(`You should first call TestExpressAppHandler.start`);
    return this.app;
  }

  private getServerAddressInfo(): AddressInfo {
    if (!this.server) throw new Error("Server is not started");
    const address = this.server.address();
    if (!address) throw new Error("Server is not started");
    if (typeof address === "string")
      throw new Error(
        "Unsupported case: string returned from httpServer.address call",
      );
    return address;
  }

  public getServerBaseUrl(): string {
    const address = this.getServerAddressInfo();
    return `http://localhost:${address.port}`;
  }
}
