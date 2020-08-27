import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  @Input() productForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<ImagesComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Product,
              public productService: ProductService,
              public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

}