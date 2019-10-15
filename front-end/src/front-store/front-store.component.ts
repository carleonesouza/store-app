import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { DataService } from '../services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/models/product';
import { PaymentDialogComponent } from 'src/dialogs/payment-dialog/payment-dialog.component';
import { VenderService } from 'src/services/vender.service';

@Component({
  selector: 'app-front-store',
  templateUrl: './front-store.component.html',
  styleUrls: ['./front-store.component.scss'],
})
export class FrontStoreComponent implements OnInit {
  sellProducts = [];
  sellProduct: Product;
  condition: boolean;
  state = 'hidden';
  show = false;
  amount = 0;
  test = [];
  id: any;
  errorMsg: any;
  updateProductForm: FormGroup;


  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private fb: FormBuilder,
              private dataService: DataService, private venderService: VenderService) {
    this.createForm();
  }

  ngOnInit() {
    this.dataService.getProducts()
    .subscribe(
      (data: Product[]) => this.sellProducts = data,
      error => this.snackBar.open('Sorry, occurred an error ' + error, 'RETRY', {
        duration: 3000,
      })
    );

    this.dataService.getProducts().subscribe( res => {
      res.map((item) => {
        this.id = item._id;
      });
    });
  }

  private createForm() {
    this.updateProductForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required]
    });
  }


  openSnackBar() {
    this.snackBar.open('Payment complent Successfully !!', '', {
      duration: 3000,
    });
  }

  add() {
    this.condition = true;
    console.log('clicado');
  }

  addAmount(product: Product) {
    if (this.amount >= 0 ) {
    this.dataService.setAmount(product);
    }
    this.amount = this.dataService.getAmount();
    console.log(this.amount);
  }

  onClean(product: Product) {
    if (this.amount > 0) {
      this.dataService.setOnClean(product);
    } else {
      this.snackBar.open('Amount is already 0!', '', {
        duration: 3000,
      });
    }
    this.amount = this.dataService.getAmount();
  }
  openDialog(product: Product): void {
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      disableClose: true,
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
