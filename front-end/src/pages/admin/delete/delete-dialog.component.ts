import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, Input } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {
  action: string;
  localData: any;
  @Input() productForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Product,
              public productService: ProductService, public snackBar: MatSnackBar, private formBuilder: FormBuilder) { }

              ngOnInit() {
                this.productForm = this.formBuilder.group({
                  nameProduct: ['', [Validators.required, Validators.minLength(3)]],
                  descriptionProduct: ['', [Validators.required, Validators.minLength(3)]],
                  priceProduct: ['', [Validators.required, Validators.minLength(2)]],
                });
                this.productForm.setValue(
                  {
                    nameProduct: this.data.name,
                    descriptionProduct: this.data.description,
                    priceProduct: this.data.price
                  }
                );
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.productService.addProduct(this.data);
  }

  onSubmit() {
    if (this.productForm.valid.valueOf()) {
      const _id = this.data._id;
      const name = this.productForm.value.nameProduct;
      const price = this.productForm.value.priceProduct;
      const description = this.productForm.value.descriptionProduct;
      const product = { _id, name, price, description };
      this.productService.deleteProduct(new Product(product));
      this.dialogRef.close();
    } else {
      this.dialogRef.close();
      this.snackBar.open('There is not a Product to delete!!', '', { duration: 3000 });
    }
  }
}
