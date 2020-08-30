import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, Input } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoreAppService } from 'src/services/store-app.service';
import { Category } from 'src/models/category';


@Component({
  selector: 'add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {
  action: string;
  localData: any;
  categories: Category[];
  @Input() productForm: FormGroup;


  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Product,
              private productService: ProductService,
              private storeAppService: StoreAppService,
              public snackBar: MatSnackBar,
              private formBuilder: FormBuilder) {
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

                this.productForm = this.formBuilder.group({
                  nameProduct: ['', [Validators.required, Validators.minLength(3)]],
                  descriptionProduct: ['', [Validators.required, Validators.minLength(3)]],
                  priceProduct: ['', [Validators.required, Validators.minLength(2)]],
                  productCategory: ['', [Validators.required]]
                });
              }


  get nameProduct() {
    return this.productForm.get('nameProduct');
  }

  get descriptionProduct() {
    return this.productForm.get('descriptionProduct');
  }

  get priceProduct() {
    return this.productForm.get('priceProduct');
  }

  get productCategory() {
    return this.productForm.get('productCategory');
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.productService.addProduct(this.data);
  }

  onSubmit() {
    const price = Number.parseInt(this.productForm.value.priceProduct);

    if (isNaN(price)) { return 0; }

    if (this.productForm.valid.valueOf() && price >= 0) {
      const name = this.productForm.value.nameProduct;
      const description = this.productForm.value.descriptionProduct;
      const categoryId = this.productForm.value.productCategory;
      const saveProduct = { name, price, description, categoryId};
      this.productService.addProduct(new Product(saveProduct));
      this.dialogRef.close();
    } else {
      this.dialogRef.close();
      this.snackBar.open('The form is empty, please fill it!!', '', { duration: 3000 });
    }
  }
}
