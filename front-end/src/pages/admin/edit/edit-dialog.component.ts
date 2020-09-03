import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, Input } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoreAppService } from 'src/services/store-app.service';
import { Category } from 'src/models/category';

@Component({
  selector: 'edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  action: string;
  localData: any;
  selectedCategory;
  categories: Category[];
  @Input() productForm: FormGroup;

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

                this.productForm = this.formBuilder.group({
                  nameProduct: ['', [Validators.required, Validators.minLength(3)]],
                  descriptionProduct: ['', [Validators.required, Validators.minLength(3)]],
                  priceProduct: ['', [Validators.required, Validators.minLength(2)]],
                  productCategory:[this.data.category.name, Validators.required]
                });

                this.selectedCategory= this.productForm.get('productCategory').value;
                this.productForm.setValue(
                  {
                    nameProduct: this.data.name,
                    descriptionProduct: this.data.description,
                    priceProduct: String(this.data.price).substring(2),
                    productCategory: this.categories
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
    if (this.productForm.valid.valueOf()) {
      const _id = this.data._id;
      const name = this.productForm.value.nameProduct;
      const price = this.productForm.value.priceProduct;
      const description = this.productForm.value.descriptionProduct;
      const category = this.productForm.value.productCategory;
      const saveProduct = { _id, name, price, description, category};
      this.productService.updateProduct(new Product(saveProduct));
      this.dialogRef.close();
    } else {
      this.dialogRef.close();
      this.snackBar.open('The form is empty, please fill it!!', '', { duration: 3000 });
    }
  }
}
