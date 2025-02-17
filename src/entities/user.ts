import { Role } from "../utils/enums";
import { Entity } from "./base-entities";

export class User extends Entity {
  name!: string;
  email!: string;
  role: Role = Role.USER;

  constructor(name: string, email: string, role: Role) {
    super();
    this.name = name;
    this.email = email;
    this.role = role;
  }
}
