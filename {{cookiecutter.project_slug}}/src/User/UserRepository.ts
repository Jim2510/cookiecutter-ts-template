import "reflect-metadata"
import {inject, singleton} from "tsyringe";
import {User} from "./User";
import {DbCtx} from "../DB/DbCtx";
import {Collection, ObjectId} from "mongodb";
import {MongoDbRecordDTO} from "../DB/MongodbRecordDTO";
import {UserDTO} from "./UserDTO";
import {DbModuleIoCTokens} from "../DB/DbModuleIoCToken";
import {Email} from "../Email/Email";
import {UserDTOWithEmailClass} from "./UserWithEmailDTO";
import {NotFoundException} from "../Error/NotFoundException";

type RecordDTO = MongoDbRecordDTO<UserDTO>;
export type NotFoundResult = {     found: false }
export type FoundResult<T> = {     found: true, value: T }
type FoundOrNotFoundResult<T> = NotFoundResult | FoundResult<T>

export function found<T>(v: T): FoundResult<T> {
    return {
        found: true,
        value: v,
    };
}

export function notFound(): NotFoundResult {
    return {
        found: false,
    };
}


@singleton()
export class UserRepository {
    private readonly collection: Collection<RecordDTO>;
    public static readonly collectionName = "users";
    constructor(@inject(DbModuleIoCTokens.DbCtx) dbCtx: DbCtx) {
        this.collection = dbCtx.getDb().collection(UserRepository.collectionName);
    }

    public async getById(id: string): Promise<User> {
        const dto = await this.collection.findOne({
            id,
        });
        if (!dto) throw new NotFoundException(`User with id ${id} not found`);
        return new User(dto);
    }

    async safelyGetByEmail(email: Email): Promise<FoundOrNotFoundResult<User>> {
        const dto = await this.collection.findOne({
            email: email.toString(),
        });
        if (!dto) return notFound();
        return found(new User(dto));
    }

    async getAllUsers(): Promise<User[]> {
        const dtos = await this.collection.find({}).toArray();
        return dtos.map(dto => new User(dto));
    }

    public async createUser(user: UserDTOWithEmailClass): Promise<{
        user: User;
        createdAt: Date;
    }> {
        const createdAt = new Date();
        await this.collection.insertOne({
            ...user,
            email: user.email.toString(),
            createdAt: createdAt,
        });
        return { user: await this.getById(user.id), createdAt };
    }
}