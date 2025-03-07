import {singleton} from "tsyringe";
import {UserRepository} from "./UserRepository";
import {NextFunction, Request, Response} from "express";
import {User} from "./User";

@singleton()
export class UserController {
    constructor(private readonly userRepository: UserRepository) {}


    public async getAllUsersByEmail(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const input = req.body
            const result = await this.userRepository.safelyGetByEmail(input)
            const data = result
            res.status(200).json(data)
        }catch (e) {
            res.status(500).json({error: e})
        }
    }

    public async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.userRepository.getAllUsers()
            res.status(200).json(result)
        }catch (e){
            res.status(500).json({error: e})
            next(e)
        }
    }

    public async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = await this.userRepository.createUser(req.body)
            res.status(200).json(user)
        }catch (e) {
            res.status(500).json({error: e})
            next(e)
        }
    }

    public async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = await this.userRepository.getById(req.params.id)
            res.status(200).json(user)
        }catch (e) {
            res.status(500).json({error: e})
            next(e)
        }
    }
}