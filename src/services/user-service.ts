import { Database } from "../database/database";
import { User } from "../entities/user";
import { logger, RoleGuard } from "../utils/decorators";
import { Role } from "../utils/enums";

export class UserService {
  private db = new Database<User>();

  getAllUsers(caller: User): User[] {
    const users = this.db.findAll();
    if (!users || users.length === 0) {
      throw new Error("No users found");
    }
    return users;
  }

  getUserById(caller: User, id: string): User {
    const user = this.db.findById(id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  }

  createUser(name: string, email: string, role: Role): User {
    const user = new User(name, email, role);
    return this.db.save(user);
  }

  @logger
  updateUser(caller: User, userId: string, updatedData: Partial<User>): User {
    const existingUser = this.db.findById(userId);

    const newUser = {
      ...existingUser,
      ...updatedData,
      id: existingUser.id,
      createdAt: existingUser.createdAt,
      updatedAt: new Date()
    };

    return this.db.save(newUser);
  }

  @logger
  @RoleGuard(Role.ADMIN)
  deleteUser(caller: User, userId: string) {
    const user = this.db.findById(userId);

    if (!user) {
      throw new Error(`Entity with this id: ${userId} , doesn't exist. `);
    }

    this.db.delete(userId);
    return user;
  }
}
