/**
 * Class responsible to generate new Products on the Store
 */
import { Injectable } from '@angular/core';

@Injectable()
export class Product {
	_id?: string;
	name: string;
	price: number;
	amount?: number;
	description: string;

	constructor(obj?: any) {
		 if (!obj) {
			return;
		}
		 this.name = obj.name ;
		 this.description = obj.description;
		 this.price = obj.price;
		 this.amount = 0;
	}
}
