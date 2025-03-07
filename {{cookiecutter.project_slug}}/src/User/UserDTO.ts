import {ObjectId} from "mongodb";

export type UserDTO = {
    _id: ObjectId;
    id: string;
    email: string;
    givenName: string;
    familyName: string;
    deleted?: {
        emailBeforeDeletion: string;
        deletedAt: Date;
        authIdBeforeDeletion: string;
    };
    lastLogIn?: Date;
};
