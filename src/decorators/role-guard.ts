import { User } from "../entities/user";

export function RoleGuard(role: string) {
  return function (
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;

    descriptor.value = function (user: User, ...args: unknown[]) {
      if (user.role !== role) {
        throw new Error(
          `User ${user.name} doesn't have this permissions. Only users with ${role} role are authorized. `
        );
      }

      const originalArgs = [user, ...args];

      return original.call(this, ...originalArgs);
    };
  };
}
