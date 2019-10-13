import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Product } from '../../models/product';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-delete.dialog',
  templateUrl: './delete.dialog.component.html',
  styleUrls: ['./delete.dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {
  action: string;
  localData: any;
  @Input() productForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Product,
              public dataService: DataService, public snackBar: MatSnackBar, private formBuilder: FormBuilder) { }

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
    this.dataService.addProduct(this.data);
  }

  onSubmit() {
    if (this.productForm.valid.valueOf()) {
      const _id = this.data._id;
      const name = this.productForm.value.nameProduct;
      const price = this.productForm.value.priceProduct;
      const description = this.productForm.value.descriptionProduct;
      const saveProduct = { _id, name, price, description };
      this.dataService.deleteProduct(new Product(saveProduct));
      this.dialogRef.close();
    } else {
      this.dialogRef.close();
      this.snackBar.open('There is not a Product to delete!!', '', { duration: 3000 });
    }
  }
}
