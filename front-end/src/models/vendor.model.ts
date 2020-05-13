import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable()
export class Vendor {
    _id?: string;
    name?: string;
    productId: string;
    amount = 0;
    quantity: number;
    total = 0;
    createdAt?: Date;

    constructor(obj?: any) {
        if (!obj) {
          return;
        }
        this._id = obj._id;
        this.productId = obj.product;
        this.amount = obj.amount;
        this.total = obj.total;
        this.createdAt = obj.createdAt;
        this.quantity = parseInt('', obj.quantity) || 0;

      }

}
