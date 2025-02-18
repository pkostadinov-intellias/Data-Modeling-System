import { Entity } from "./base-entities";

export class Product extends Entity {
  name: string;
  price: number;
  orderIds: string[] = [];

  constructor(name: string, price: number) {
    super();
    this.name = name;
    this.price = price;
  }
}
