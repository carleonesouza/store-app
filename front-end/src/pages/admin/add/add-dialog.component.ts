import { Component, OnInit, Input, Inject, AfterContentInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoreAppService } from 'src/services/store-app.service';
import { Category } from 'src/models/category';
import { CATEGORY, PRODUCT } from 'src/utils/constants';
import { categoryFields, fieldsDeletion, productFields } from 'src/models/formFields.model';


@Component({
  selector: 'add-dialog',
  templateUrl: '../crud-templete/crud.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit, AfterContentInit {
  categories: Category[];
  title: any;
  group = {};
  fields: string[];


  @Input() dinamicContent: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private storeAppService: StoreAppService,
     public snackBar: MatSnackBar) {
    this.categories = [];
  }

  ngOnInit() {

    this.storeAppService.getGenericAction('/categories').subscribe(
      (categories) => {
        categories.map(
          (category: Category) => {
            this.categories.push(category);
          });
      });

  }

  ngAfterContentInit() {
    if (this.data === PRODUCT) {
      this.onLoadProducts();
    } else {
      this.onLoadCategories();
    }

  };

  onLoadCategories() {
    this.title = 'Add a new '+ CATEGORY;
    this.fields = Object.getOwnPropertyNames(categoryFields[0]);

    this.fields = this.fields.filter(item => !fieldsDeletion.includes(item));

    this.fields.forEach(e => {
      this.group[e] = new FormControl('', Validators.required);
    });

    this.dinamicContent = new FormGroup(this.group);

  }

  onLoadProducts() {
    this.title =  'Add a new '+PRODUCT;

    this.fields = Object.getOwnPropertyNames(productFields[0]);

    this.fields = this.fields.filter(item => !fieldsDeletion.includes(item));

    this.fields.forEach(e => {
      this.group[e] = new FormControl('', Validators.required);
    });

    this.dinamicContent = new FormGroup(this.group);

  }

  getError(event) {
    return this.dinamicContent.controls[event].hasError;
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
/*   onSubmit() {
    const price = Number.parseInt(this.productForm.value.priceProduct,0);

    if (isNaN(price)) { return 0; }

    if (this.productForm.valid.valueOf() && price >= 0) {
      const name = this.productForm.value.nameProduct;
      const description = this.productForm.value.descriptionProduct;
      const category = this.productForm.value.productCategory;
      const saveProduct = { name, price, description, category };
      this.productService.addProduct(new Product(saveProduct));
      this.dialogRef.close();
    } else {
      this.dialogRef.close();
      this.snackBar.open('The form is empty, please fill it!!', '', { duration: 3000 });
    }
  } */
}
