import { isDefined } from "../isDefined.js";
import EmailValidator from "email-validator";

export class Email {
    constructor(private readonly email: string) {
        if (!Email.isValid(email)) throw new Error(`Invalid email: ${email}`);
    }

    public toString(): string {
        return this.email.toLowerCase().trim();
    }

    public getDomain(): string {
        if (!this.email?.includes("@")) return "";
        const [, domain] = this.email.split("@");
        return domain;
    }

    public includes(string: string): boolean {
        return !!this.email?.includes(string);
    }

    static isValid(email?: string): boolean {
        return isDefined(email) && EmailValidator.validate(email);
    }
}
