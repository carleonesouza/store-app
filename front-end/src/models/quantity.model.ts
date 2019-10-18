/**
 * Class responsible to generate new Quantity of Productt for Store
 */
import { Injectable } from '@angular/core';

@Injectable()
export class Quantity {
    productId: string;
    quantity = 0;

    constructor(obj?: any) {
        if (!obj) {
          return;
        }
        this.productId = obj.productId;
        this.quantity = obj.quantity;
      }

}
