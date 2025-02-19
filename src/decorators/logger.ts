export function logger(
  target: unknown,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value;

  descriptor.value = function (...args: unknown[]) {
    const result = original.call(this, ...args);
    console.log(`result from ${propertyKey}: `, result);
    return result;
  };
}
