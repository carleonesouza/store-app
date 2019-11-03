import { Injectable } from '@angular/core';
import { Vender } from './vender.model';
import { BillMethod } from './bill-method';

@Injectable()
export class BagVenders {

 venders: Vender [];
 billsMethod: BillMethod [];
}

