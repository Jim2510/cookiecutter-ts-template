import {UserDTO} from "./UserDTO";
import {Email} from "../Email/Email";

export class User {
    constructor(private readonly dto: UserDTO) {}

    get id(): string {
        return this.dto.id;
    }
    getEmail(): string {
        return new Email(this.dto.email).toString();
    }

    getGivenName(): string {
        return this.dto.givenName ?? "";
    }

    getFamilyName(): string {
        return this.dto.familyName ?? "";
    }

    getDeletedAt(): Date {
        if (!this.dto.deleted) throw new Error("User is not deleted");
        return this.dto.deleted.deletedAt;
    }

    hasLoggedAtLeastOnce(): boolean {
        return !!this.dto.lastLogIn;
    }
}
