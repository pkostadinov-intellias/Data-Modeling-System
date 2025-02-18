import { Entity } from "./base-entities";

export class Order extends Entity {
  userId: string;
  productIds: string[] = [];
  totalPrice: number;
  status: "pending" | "shipped" | "delivered" = "pending";

  constructor(userId: string, productIds: string[], totalPrice: number) {
    super();
    this.userId = userId;
    this.productIds = productIds;
    this.totalPrice = totalPrice;
  }
}
