import { DependencyContainer } from "tsyringe";
import { DbCtx } from "./DbCtx.js";
import {IDependencyModule} from "../IoC/IDependencyModule";
import {EnvironmentEnum} from "../Config/EnvironmentEnum";
import {EnvironmentConfig} from "../Config/EnvironmentConfig";
import {DbModuleIoCTokens} from "./DbModuleIoCToken";
import {ConfigModuleIoCTokens} from "../Config/ConfigModuleIocTokens";

export class DbModule implements IDependencyModule {
    async register(container: DependencyContainer): Promise<void> {
        const config = container.resolve<EnvironmentConfig>(
            ConfigModuleIoCTokens.EnvironmentConfig,
        );
        const dbCtx = await DbCtx.connect(
            config.get(EnvironmentEnum.DbUri),
            config.get(EnvironmentEnum.DbName),
        );
        container.register(DbModuleIoCTokens.DbCtx, {
            useValue: dbCtx,
        });
    }
}
