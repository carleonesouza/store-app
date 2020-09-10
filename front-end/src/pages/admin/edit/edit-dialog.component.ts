import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, Input, ViewChild } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoreAppService } from 'src/services/store-app.service';
import { Category } from 'src/models/category';
import { ProductFormModel } from 'src/models/product-form.model';

@Component({
  selector: 'edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  action: string;
  localData: any;
  selectedCategory;
  group={}
  categories: Category[];
  products = new ProductFormModel();

  @Input() dinamicForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Product,  private storeAppService: StoreAppService,
              public productService: ProductService, public snackBar: MatSnackBar, private formBuilder: FormBuilder) {
                this.categories= [];
              }

              ngOnInit() {

                this.storeAppService.getGenericAction('/categories').subscribe(
                  (categories) => {
                     categories.map(
                        (category: Category )=> {
                            this.categories.push(category);
                    });
                });

                this.products.fields.forEach(input_template => {
                  this.group[input_template.label]= new FormControl('', Validators.required);
                });

                this.dinamicForm = new FormGroup(this.group);

                this.dinamicForm.setValue(
                  {
                    'Product Name': this.data.name,
                    'Product Description': this.data.description,
                    'Product Price': String(this.data.price).substring(2),
                    Category: this.data.category,
                  });

                this.selectedCategory= this.data.category.name;
              }



  getError(event){
    return this.dinamicForm.controls[event].hasError;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.productService.addProduct(this.data);
  }

  onSubmit() {
    if (this.dinamicForm.valid.valueOf()) {

      console.log(this.dinamicForm.value);
      this.dialogRef.close();
    } else {
      this.dialogRef.close();
      this.snackBar.open('The form is empty, please fill it!!', '', { duration: 3000 });
    }
  }
}
