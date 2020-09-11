import { Component, Inject, OnInit, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../models/product.model';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoreAppService } from 'src/services/store-app.service';
import { Category } from 'src/models/category';
import { AfterContentInit } from '@angular/core';
import { CATEGORY, PRODUCT } from '../../../utils/constants';
import { categoryFields, productFields, fieldsDeletion } from 'src/models/formFields.model';

@Component({
  selector: 'edit-dialog',
  templateUrl: '../crud-templete/crud.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit, AfterContentInit {

  selectedCategory: any;
  loading: boolean;
  title: string;
  group = {};
  fields: string[];
  categories: Category[];

  @Input() dinamicContent: FormGroup;
  @Input('choose') choose: string;


  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private storeAppService: StoreAppService,
    public snackBar: MatSnackBar) {
    this.categories = [];
  }

  ngOnInit() {

    this.storeAppService.getGenericAction('/categories').subscribe(
      (categories) => {
        categories.map(
          (category: Category) => {
            this.loading = false;
            this.categories.push(category);
          });
      });

  }
  ngAfterContentInit() {
    if (new Product(this.data).category) {
      this.onLoadProducts();
    } else if (new Category(this.data).name) {
      this.onLoadCategories();
    }

  };


  getError(event) {
    return this.dinamicContent.controls[event].hasError;
  }

  onLoadCategories() {
    this.title = CATEGORY;
    this.fields = Object.getOwnPropertyNames(categoryFields[0]);

    this.fields = this.fields.filter(item => !fieldsDeletion.includes(item));
    this.fields.forEach(e => {
      this.group[e] = new FormControl('', Validators.required);
    });

    this.dinamicContent = new FormGroup(this.group);
    this.dinamicContent.patchValue(this.data);

  }

  onLoadProducts() {
    if(!this.data){
      this.snackBar.open('We cannot loading the data!!', '', { duration: 3000 });
    }else {

      this.title = PRODUCT;
      this.fields = Object.getOwnPropertyNames(productFields[0]);
      this.fields = this.fields.filter(item => !fieldsDeletion.includes(item));
      this.fields.forEach(e => {
        this.group[e] = new FormControl('', Validators.required);
      });

      this.data.price = String(this.data.price).substring(2);

      this.dinamicContent = new FormGroup(this.group);
      this.dinamicContent.patchValue(this.data);

      this.selectedCategory = this.data.category.name;
    }


  }

  onCancel(): void {
    this.dialogRef.close();
  }


  onSubmit() {
    if (this.dinamicContent.valid.valueOf()) {

      console.log(this.dinamicContent.value);
      this.dialogRef.close();
    } else {
      this.dialogRef.close();
      this.snackBar.open('The form is empty, please fill it!!', '', { duration: 3000 });
    }
  }
}
