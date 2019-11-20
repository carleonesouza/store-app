import { Injectable } from '@angular/core';
import { Vendor } from './vendor.model';
import { BillMethod } from './bill-method';

@Injectable()
export class BagVenders {

 venders?: Vendor [];
 billsMethod?: BillMethod [];
 createdAt?: Date;
 updatedAt?: Date;
}

