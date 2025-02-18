import { Entity } from "../entities/base-entities";

export class Database<T extends Entity> {
  private storage: Map<string, T> = new Map();

  save(entity: T): T {
    if (!entity.id) {
      entity.id = crypto.randomUUID();
    }
    this.storage.set(entity.id, entity);
    return entity;
  }

  findAll(): T[] {
    return Array.from(this.storage.values());
  }

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
    return this.storage.delete(id);
  }
}
