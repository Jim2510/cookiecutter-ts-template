import {isDefined} from "../isDefined";
import {EnvironmentEnum} from "./EnvironmentEnum";

export class EnvironmentConfig<T extends string = EnvironmentEnum> {
    constructor(
        private readonly envs: string[] = [],
        private readonly optionalEnvs: string[] = [],
    ) {
        envs.forEach((env) => {
            if (!isDefined(process.env[env]) && !this.isOptional(env))
                throw new Error(`Environment variable ${env} is not set`);
        });
    }

    private isOptional(v: string): boolean {
        return this.optionalEnvs.includes(v);
    }

    public get(v: T): string {
        const env = process.env[v];
        if (this.isOptional(v))
            throw new Error(
                `Trying to get optional env ${v} with get method. You should use getWithDefault instead`,
            );
        if (!isDefined(env))
            throw new Error(`Environment variable ${v} is not set`);
        return env;
    }

    public getWithDefault(v: T, defaultValue: string): string {
        const env = process.env[v];
        if (!isDefined(env)) return defaultValue;
        return env;
    }
}
