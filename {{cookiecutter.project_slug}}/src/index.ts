import "reflect-metadata"
import express, {json} from "express";
import dotenv from "dotenv";
import {registerAllModules} from "./IoC/registerAllModules";
import {container} from "tsyringe";
import {EnvironmentConfig} from "./Config/EnvironmentConfig";
import {ConfigModuleIoCTokens} from "./Config/ConfigModuleIocTokens";
import {EnvironmentEnum} from "./Config/EnvironmentEnum";
import {userRouter} from "./User/UserRouter";
dotenv.config()

async function start(): Promise<void> {
    await registerAllModules(container);
    const app = express();
    app.use(json());

    const config = container.resolve<EnvironmentConfig>(
        ConfigModuleIoCTokens.EnvironmentConfig,
    );

    const port = config.getWithDefault(EnvironmentEnum.Port, "3760");

    app.use("/user", userRouter)

    app.listen(port, () => {
        console.log(`Service listening on http://localhost:${port}`);
    });
}
 start().then(_ => {});
