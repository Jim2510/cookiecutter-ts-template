import {Email} from "../Email/Email";
import {UserDTO} from "./UserDTO";

export type UserDTOWithEmailClass = Omit<UserDTO, "email"> & {
    email: Email;
};
