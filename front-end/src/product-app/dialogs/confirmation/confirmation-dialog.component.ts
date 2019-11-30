import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../../services/product.service';
import { MatSnackBar } from '@angular/material';
import { Vendor } from 'src/models/vendor.model';
import { BillDialogComponent } from '../bill-dialog/bill-dialog.component';
import { VendorService } from 'src/services/vendor.service';

@Component({
    selector: 'app-confirmation.dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
    displayedColumns: string[] = ['name', 'quantity', 'total', 'actions'];
    dataSource: Vendor[];

    constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Vendor, private vendorService: VendorService,
                public productService: ProductService, private dialog: MatDialog,
                public snackBar: MatSnackBar) { }

    ngOnInit() {
        this.productService.onBackVender().subscribe(
            (data: Vendor[]) => {
                this.dataSource = data;
                this.dataSource.map((e) => {
                    this.productService.getProductById(e.productId).subscribe(
                        (base) => {
                            e.name = base.name;
                        }
                    );
                });
            },
            (err) => this.snackBar.open('You Have to set the Quantity of Product ' + err, '', { duration: 3000 })
        );

    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onConfirmation(): void {
        if (this.dataSource.length !== 0) {
            this.dataSource.map((vendor) => {
            this.vendorService.addVendor(vendor);
            });
            this.onNoClick();
            this.dialog.open(BillDialogComponent, {
                data: this.dataSource,
                disableClose: true
            });
        } else {
            this.snackBar.open('You must confirm just when have a product selected !', '', {duration: 4000});
            this.dialogRef.close();
        }
      }

}
