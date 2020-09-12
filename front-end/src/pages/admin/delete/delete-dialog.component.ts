import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, Input, AfterContentInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/models/category';
import { categoryFields, fieldsDeletion, productFields } from 'src/models/formFields.model';
import { StoreAppService } from 'src/services/store-app.service';
import { PRODUCT, CATEGORY } from 'src/utils/constants';

@Component({
  selector: 'delete-dialog',
  templateUrl: '../crud-templete/crud.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit, AfterContentInit {

  selectedCategory: any;
  loading: boolean;
  title: string;
  group = {};
  fields: string[];
  categories: Category[];

  @Input() dinamicContent: FormGroup;

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private storeAppService: StoreAppService,
    public snackBar: MatSnackBar) {
    this.categories = [];
  }

  ngOnInit() {  }

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
    this.title = 'Are you sure about DELETE a '+ CATEGORY;
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

      this.title = 'Are you sure about DELETE a '+PRODUCT;
      this.checkCategory();

      this.fields = Object.getOwnPropertyNames(productFields[0]);
      this.fields = this.fields.filter(item => !fieldsDeletion.includes(item));

      this.fields.forEach(e => {
        this.group[e] = new FormControl('', Validators.required);
      });

      if(String(this.data.price).startsWith('R$')){
        this.data.price = String(this.data.price).trim().substring(2);
      }else{  this.data.price = String(this.data.price)}


      this.dinamicContent = new FormGroup(this.group);
      this.dinamicContent.patchValue(this.data);

      this.selectedCategory = this.data.category.name;
    }


  }

  checkCategory(){

    this.storeAppService.getGenericAction('/categories').subscribe(
      (categories) => {
        categories.map(
          (category: Category) => {
            this.loading = false;
            this.categories.push(category);
          });
      });

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
    }
  }
}
