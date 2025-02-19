export function memoize(
  target: unknown,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value;

  descriptor.value = function (this: any, id: string) {
    if (!this.cacheStorage) {
      this.cacheStorage = new Map();
    }

    const cachingKey = `${propertyKey},${id}`;

    if (this.cacheStorage.has(cachingKey)) {
      return this.cacheStorage.get(cachingKey);
    }

    const result = original.apply(this, [id]);

    if (result) {
      this.cacheStorage.set(cachingKey, result);
    }

    return result;
  };
}
