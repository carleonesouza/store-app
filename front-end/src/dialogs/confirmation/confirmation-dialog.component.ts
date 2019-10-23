import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import { MatSnackBar } from '@angular/material';
import { Vender } from 'src/models/vender.model';
import { BillDialogComponent } from '../bill-dialog/bill-dialog.component';

@Component({
    selector: 'app-confirmation.dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
    displayedColumns: string[] = ['name', 'quantity', 'total', 'actions'];
    venders: Vender[];
    dataSource: Vender[];

    constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Vender,
                public dataService: DataService, private dialog: MatDialog,
                public snackBar: MatSnackBar) { }

    ngOnInit() {
        this.dataService.onBackVender().subscribe(
            (data: Vender[]) => {
                this.dataSource = data;
                this.dataSource.map((e) => {
                    this.dataService.getProductById(e.productId).subscribe(
                        (base) => {
                            e.name = base.name;
                        }
                    );
                });
            },
            (err) => this.snackBar.open('You Have to set the Quantity of Product', '', { duration: 3000 })
        );

    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    openDialog(): void {
        this.onNoClick();
        const dialogBill = this.dialog.open(BillDialogComponent, {
            data: this.dataSource
        });
        dialogBill.afterClosed().subscribe(() => {
          console.log('The dialog was closed');
        });
      }

}
