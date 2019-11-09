import { Injectable } from '@angular/core';
import { BillMethod } from './bill-method';

@Injectable()
export class ManagementModel implements BillMethod {

    productName: string;
    productId: string;
    paymentMethod: string;
    billValue = 0 ;
    quantity = 0;
    total = 0;

}
