import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/models/product.model';
import { ProductService } from 'src/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  action: string;
  localData: any;
  files: File[] = [];
  @Input() productImageForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<ImagesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    public productService: ProductService,
    public snackBar: MatSnackBar,  private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.localData = this.data;
    if (this.data!== null){
      this.productImageForm = this.formBuilder.group({
        productId: [this.data._id],
        productPhotos: ['', Validators.required],
      });
    }
  }

  get productId() {
    return this.productImageForm.get('productId');
  }

  get productPhotos() {
    return this.productImageForm.get('productPhotos');
  }

  onSelect(event) {
    this.files.push(...event.addedFiles)
    this.productImageForm.patchValue({
      productPhotos: this.files
    });
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.productImageForm.valid.valueOf()) {
      console.log(this.productImageForm);
      this.dialogRef.close();
    } else {
      this.dialogRef.close();
      this.snackBar.open('The form is empty, please fill it!!', '', { duration: 3000 });
    }
  }

}
