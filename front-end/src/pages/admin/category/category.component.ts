import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/models/product.model';
import { ProductService } from 'src/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  action: string;
  localData: any;
  @Input() categoryForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<CategoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Product,
              public productService: ProductService,
              public snackBar: MatSnackBar,
              private formBuilder: FormBuilder) { }

              ngOnInit() {
                this.categoryForm = this.formBuilder.group({
                  categoryName: ['', [Validators.required, Validators.minLength(3)]],
                });
              }


  get categoryName() {
    return this.categoryForm.get('categoryName');
  }


  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.categoryForm.valid.valueOf()) {
      const name = this.categoryForm.value.categoryName;
      this.dialogRef.close();
    } else {
      this.dialogRef.close();
      this.snackBar.open('The form is empty, please fill it!!', '', { duration: 3000 });
    }
  }
}