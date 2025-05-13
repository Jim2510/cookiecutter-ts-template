import * as path from "path";
import { config } from "dotenv";
import { getDirName } from "../getDirName.js";
export function loadTestEnv(): void {
  config({
    path: path.join(getDirName(import.meta.url), "../../.env.test"),
  });
}
