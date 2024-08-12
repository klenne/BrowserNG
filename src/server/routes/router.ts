import { Router } from "express";

export interface Routable {
  getRouter(): Router;
}
