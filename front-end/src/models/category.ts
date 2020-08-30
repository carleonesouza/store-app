'use strict';
/**
 * Class responsible to generate new Category on the Store
 */
import { Injectable } from '@angular/core';

@Injectable()
export class Category {
  _id?: any;
  name: string;
  productId?: any;


  constructor(obj?: any) {
    if (!obj) {
      return;
    }

    this._id = obj._id;
    this.name = obj.name;
    this.productId = obj.productId;
  }
}
