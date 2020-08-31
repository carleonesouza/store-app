'use strict';
/**
 * Class responsible to generate new Products on the Store
 */
import { Injectable } from '@angular/core';

@Injectable()
export class Product {
  _id?: any;
  name: string;
  price: any;
  description: string;
  quantity = 0;


  constructor(obj?: any) {
    if (!obj) {
      return;
    }

    this._id = obj._id;
    this.name = obj.name;
    this.description = obj.description;
    this.price = obj.price;
    this.quantity =  parseInt('', obj.quantity) || 0 ;
  }
}
