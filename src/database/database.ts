import { memoize } from "../decorators/memoize";
import { Entity } from "../entities/base-entities";

export class Database<T extends Entity> {
  private storage: Map<string, T> = new Map();
  cacheStorage: Map<string, T> = new Map();

  private clearCacheStorage(): void {
    this.cacheStorage.clear();
  }

  save(entity: T): T {
    if (!entity.id) {
      entity.id = crypto.randomUUID();
    }
    this.storage.set(entity.id, entity);
    this.clearCacheStorage();
    return entity;
  }

  findAll(): T[] {
    return Array.from(this.storage.values());
  }

  @memoize
  findById(id: string): T {
    const entity = this.storage.get(id);
    if (!entity) {
      throw new Error(`Entity with id '${id}' not found.`);
    }
    return entity;
  }

  delete(id: string): boolean {
    if (!this.storage.has(id)) {
      throw new Error(`Cannot delete: Entity with id '${id}' does not exist.`);
    }

    const deleted = this.storage.delete(id);
    if (deleted) {
      this.clearCacheStorage();
    }
    return deleted;
  }
}
