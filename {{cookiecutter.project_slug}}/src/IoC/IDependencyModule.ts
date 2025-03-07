import { DependencyContainer } from "tsyringe";

export interface IDependencyModule {
    register(container: DependencyContainer): void | Promise<void>;
}
