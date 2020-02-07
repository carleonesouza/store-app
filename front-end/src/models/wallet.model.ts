import { Injectable } from '@angular/core';

@Injectable()
export class Wallet {
    _id?: string;
    userId: string;
    bills?: string;
    vendors?: string;
    openValue = 0;
    finishValue ?= 0;
    createdAt?: Date;
    closeAt?: Date;
    status ?= false;

    constructor(obj?: any) {
        if (!obj) {
          return;
        }
        this._id = obj._id;
        this.userId = obj.userId;
        this.vendors = obj.vendor;
        this.bills = obj.bill;
        this.createdAt = obj.createdAt;
        this.finishValue = obj.finishValue;
        this.openValue = obj.openValue;

      }
}
