import {EnvironmentConfig} from "./EnvironmentConfig";
import {IDependencyModule} from "../IoC/IDependencyModule";
import {DependencyContainer} from "tsyringe";
import {EnvironmentEnum} from "./EnvironmentEnum";
import {ConfigModuleIoCTokens} from "./ConfigModuleIocTokens";

export class ConfigModule implements IDependencyModule {
    register(container: DependencyContainer): void {
        const config = new EnvironmentConfig(Object.values(EnvironmentEnum), [
            EnvironmentEnum.Port,
        ]);
        container.register<EnvironmentConfig>(
            ConfigModuleIoCTokens.EnvironmentConfig,
            {
                useValue: config,
            },
        );
    }
}
