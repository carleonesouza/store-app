import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

@Injectable()
export class CategoryFormModel {
    fields = [
        {
          type: 'input',
          label: 'Category Name',
          name: 'name',
          placeholder: 'Enter with name of category',
          validation: [Validators.required, Validators.minLength(2)]
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