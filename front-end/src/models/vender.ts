import { Injectable } from '@angular/core';
import { PaymentMethod } from './payment-method';

@Injectable()
export class Vender implements PaymentMethod {
    _id?: string;
    paymentMethod: string;
    productId: string;
    amount: number;
    total: number;
    sold: number;

    constructor(obj?: any) {
        if (!obj) {
          return;
        }
        this._id = obj._id;
        this.paymentMethod = obj.paymentMethod;
        this.productId = obj.productId;
        this.amount = obj.amount;
        this.total = obj.total;
        this.sold = obj.sold;
      }

}
