import {Component, OnInit, Input} from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/models/product.model';
import { Quantity } from 'src/models/quantity.model';
import { ConfirmationDialogComponent } from 'src/product-app/dialogs/confirmation/confirmation-dialog.component';

@Component({
  selector: 'front-store',
  templateUrl: './front-store.component.html',
  styleUrls: ['./front-store.component.scss'],
})

export class FrontStoreComponent implements OnInit {
  sellProducts = [];
  @Input() sellQuantity: Quantity[];
  loading = true;



  constructor(private dialog: MatDialog, private snackBar: MatSnackBar,
              private productService: ProductService) {  }

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(
        (data: Product[]) => {
        this.sellProducts = data,
        this.loading = false;
      },
        () => this.snackBar.open('Sorry, occurred an error, try later', 'RETRY', {
          duration: 3000,
        })
      );

  }

  addAmount(product: Product) {
    this.productService.changeQuantity(product);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

}
