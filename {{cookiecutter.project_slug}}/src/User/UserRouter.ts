import express, {Router, Request, Response} from "express";
import {container} from "tsyringe";
import {UserController} from "./UserController";

const userRouter: express.Router = Router();

userRouter.get("/user-by-email", async (req, res, next): Promise<void> => {
    const userController = container.resolve(UserController)
    await userController.getAllUsersByEmail(req, res, next)
})

userRouter.get("/users", async (req, res, next): Promise<void> => {
    const userController = container.resolve(UserController)
    await userController.getAllUsers(req, res, next)
})

userRouter.post("/user", async (req, res, next): Promise<void> => {
    const userController = container.resolve(UserController)
    await userController.createUser(req, res, next)
})

export {userRouter}