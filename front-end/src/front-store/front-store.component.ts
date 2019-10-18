import {Component, OnInit, Input} from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DataService } from '../services/data.service';
import { Product } from 'src/models/product.model';
import { BillDialogComponent } from 'src/dialogs/bill-dialog/bill-dialog.component';
import { Quantity } from 'src/models/quantity.model';
import { Vender } from 'src/models/vender.model';

@Component({
  selector: 'app-front-store',
  templateUrl: './front-store.component.html',
  styleUrls: ['./front-store.component.scss'],
})

export class FrontStoreComponent implements OnInit {
  sellProducts = [];
  @Input() sellQuantity: Quantity[];
  loading = true;



  constructor(private dialog: MatDialog, private snackBar: MatSnackBar,
              private dataService: DataService) {  }

  ngOnInit() {
    this.dataService.getProducts()
      .subscribe(
        (data: Product[]) => {
        this.sellProducts = data,
        this.loading = false;
      },
        (error: string) => this.snackBar.open('Sorry, occurred an error ' + error, 'RETRY', {
          duration: 3000,
        })
      );

  }

  addAmount(product: Product) {
    this.dataService.changeQuantity(product);
  }

  onSelectedProducts(product: Product) {

  }

  openDialog(product: Product): void {
    const dialogRef = this.dialog.open(BillDialogComponent, {
      disableClose: true,
      data: product
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

}
