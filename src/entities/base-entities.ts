export abstract class Entity {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.id = crypto.randomUUID();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
