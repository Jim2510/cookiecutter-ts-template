import { DependencyContainer } from "tsyringe";
import { IDependencyModule } from "./IDependencyModule.js";
import {DbModule} from "../DB/DBModule";
import {ConfigModule} from "../Config/ConfigModule";

export async function registerAllModules(
    container: DependencyContainer,
): Promise<void> {
    const modules: IDependencyModule[] = [
        new ConfigModule(),
        new DbModule(),
    ];
    for (const m of modules) await m.register(container);
}
