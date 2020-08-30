import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoreAppService } from 'src/services/store-app.service';
import { Category } from 'src/models/category';

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
              public snackBar: MatSnackBar,
              private storeAppService: StoreAppService,
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
      const category = new Category();
      category.name = this.categoryForm.value.categoryName;
      this.storeAppService.postGenericAction('/categories/add', category).subscribe((e) =>{
        this.snackBar.open(e.message, '', {duration: 4000});
      });
      this.dialogRef.close();
    } else {
      this.dialogRef.close();
      this.snackBar.open('The form is empty, please fill it!!', '', { duration: 3000 });
    }
  }
}