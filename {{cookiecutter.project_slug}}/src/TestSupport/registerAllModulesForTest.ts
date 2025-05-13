import { DependencyContainer } from "tsyringe";
import { DbCtx } from "../DB/DbCtx.js";
import { getEnvConfigForTest } from "./getEnvConfigForTest.js";
import { nanoid } from "nanoid";
import { registerAllModules } from "../IoC/registerAllModules.js";
import { DbModuleIoCTokens } from "../DB/DbModuleIoCToken.js";
import { EnvironmentEnum } from "../Config/EnvironmentEnum.js";
import { DbIndexCreator } from "../DB/DbIndexCreator.js";

export async function registerAllModulesForTest(
  container: DependencyContainer,
  options?: {
    createDbIndexes?: boolean;
  },
): Promise<void> {
  await registerAllModules(container);
  const dbCtx = container.resolve<DbCtx>(DbModuleIoCTokens.DbCtx);
  await dbCtx.disconnect();
  const config = getEnvConfigForTest(container);
  const testDbCtx = await DbCtx.createDb(
    config.get(EnvironmentEnum.DbUri),
    `test-${config.get(EnvironmentEnum.DbName)}-${nanoid()}`,
  );
  container.register(DbModuleIoCTokens.DbCtx, {
    useValue: testDbCtx,
  });
  if (options?.createDbIndexes)
    await container.resolve(DbIndexCreator).createAllIndexes();
}
