import { DependencyContainer } from "tsyringe";
import { DbCtx } from "../DB/DbCtx.js";
import { DbModuleIoCTokens } from "../DB/DbModuleIoCToken.js";

export async function tearDownDependenciesForTest(
  container: DependencyContainer,
): Promise<void> {
  const dbCtx = container.resolve<DbCtx>(DbModuleIoCTokens.DbCtx);
  await dbCtx.dropDbOnLocalhostAndDisconnect();
  container.reset();
  container.clearInstances();
}
