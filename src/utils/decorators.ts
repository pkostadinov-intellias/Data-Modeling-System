import { User } from "../entities/user";

export function logger(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value;

  descriptor.value = function (...args: any) {
    const result = original.call(this, ...args);
    console.log(`result from ${propertyKey}: `, result);
    return result;
  };
}

export function RoleGuard(role: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;

    descriptor.value = function (user: User, ...args: any) {
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
