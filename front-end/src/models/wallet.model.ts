import { Injectable } from '@angular/core';

@Injectable()
export class Wallet {
    _id?: string;
    userId: string;
    billId?: string;
    vendorId?: string;
    openValue = 0;
    finishValue ?= 0;
    createdAt?: Date;
    closeAt?: Date;
    status?: boolean;

    constructor(obj?: any) {
        if (!obj) {
          return;
        }
        this._id = obj._id;
        this.userId = obj.userId;
        this.vendorId = obj.vendorId;
        this.billId = obj.billId;
        this.createdAt = obj.createdAt;
        this.finishValue = obj.finishValue;
        this.openValue = obj.openValue;

      }
}
