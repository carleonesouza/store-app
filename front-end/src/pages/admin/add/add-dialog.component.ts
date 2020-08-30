import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, Input } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {
  action: string;
  localData: any;
  @Input() productForm: FormGroup;

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Product,
              public productService: ProductService,
              public snackBar: MatSnackBar,
              private formBuilder: FormBuilder) { }

              ngOnInit() {
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
    const price = Number.parseInt(this.productForm.value.priceProduct,2);

    if (isNaN(price)) { return 0; }

    if (this.productForm.valid.valueOf() && price >= 0) {
      const name = this.productForm.value.nameProduct;
      const description = this.productForm.value.descriptionProduct;
      const saveProduct = { name, price, description };
      this.productService.addProduct(new Product(saveProduct));
      this.dialogRef.close();
    } else {
      this.dialogRef.close();
      this.snackBar.open('The form is empty, please fill it!!', '', { duration: 3000 });
    }
  }
}
