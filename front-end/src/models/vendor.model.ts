import { Injectable } from '@angular/core';

@Injectable()
export class Vendor {
    _id?: string;
    name?: string;
    productId: string;
    amount = 0;
    total = 0;
    createdAt?: Date;

    constructor(obj?: any) {
        if (!obj) {
          return;
        }
        this._id = obj._id;
        this.productId = obj.productId;
        this.amount = obj.amount;
        this.total = obj.total;
        this.createdAt = obj.createdAt;

      }

}
