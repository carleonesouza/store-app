import { Injectable } from '@angular/core';
import { BillMethod } from './bill-method';


@Injectable()
export class ManagementModel {

    paymentMethod: string;
    billValue = 0 ;

}
