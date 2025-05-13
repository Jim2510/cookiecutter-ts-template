import { DependencyContainer } from "tsyringe";
import { EnvironmentConfig } from "../Config/EnvironmentConfig.js";
import { ConfigModuleIoCTokens } from "../Config/ConfigModuleIocTokens.js";

export function getEnvConfigForTest(
  container: DependencyContainer,
): EnvironmentConfig {
  return container.resolve<EnvironmentConfig>(
    ConfigModuleIoCTokens.EnvironmentConfig,
  );
}
