import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

@Injectable()
export class ProductFormModel {
    fields = [
        {
          type: 'input',
          label: 'Product Name',
          name: 'name',
          placeholder: 'Enter with name of product',
          validation: [Validators.required, Validators.minLength(4)]
        },
        {
            type: 'input',
            label: 'Product Description',
            name: 'description',
            placeholder: 'Enter with description of product',
            validation: [Validators.required, Validators.minLength(4)]
          },
          {
            type: 'input',
            label: 'Product Price',
            name: 'price',
            placeholder: 'Enter with price of product',
            validation: [Validators.required, Validators.minLength(4)]
          },
        {
          type: 'select',
          label: 'Category',
          name: 'category',
          options: [],
          placeholder: 'Select an option',
          validation: [Validators.required]
        },
      ];
}