import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Product } from 'src/models/product';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./create-product.component.scss']
})

export class UpdateDialogComponent implements OnInit {
  action: string;
  localData: any;
  productForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>, private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: Product) {
    this.localData = { ...data };
    this.action = this.localData.action;
  }
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

  get fieldProductExtraField() {
    return this.productForm.get('fieldProductExtraField');
  }

  doAction() {
    this.dialogRef.close({ event: this.action, data: this.localData });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  onSubmit() {
    /* if (this.productForm.valid.valueOf()) {
      const _id = this.data._id;
      const amount = this.data.amount;
      const name = this.productForm.value.nameProduct;
      const price = this.productForm.value.priceProduct;
      const description = this.productForm.value.descriptionProduct;
      const saveProduct = { _id, name, price, amount, description };
      this.storeService.updateProduct(new Product(saveProduct))
        .subscribe(
          () => {
            const snackBarRef = this.snackBar.open('The Product was Successifuly upadated ', '', { duration: 3000 });
            snackBarRef.onAction().subscribe(() => {
              this.dialogRef.close(),
                this.productForm.reset();
            });
          },
          (error) => {
            this.dialogRef.close();
            this.snackBar.open(error, 'RETRY', { duration: 4000 });
          }
        );
    } else {
      this.dialogRef.close();
      this.snackBar.open('The form is empty, please fill it!!', '', { duration: 3000 });
    } */
  }
}
