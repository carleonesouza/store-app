import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableDataSource } from '../../../services/table-data-source';
import { AddDialogComponent } from '../add/add-dialog.component';
import { EditDialogComponent } from '../edit/edit-dialog.component';
import { DeleteDialogComponent } from '../delete/delete-dialog.component';
import { fromEvent } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImagesComponent } from 'src/pages/upload/images/images.component';
import { MatAccordion } from '@angular/material/expansion';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'dashboard-adm',
  templateUrl: './dashboard-adm.component.html',
  styleUrls: ['./dashboard-adm.component.scss'],
})

export class DashboardAdmComponent implements OnInit {
  displayedColumns = ['name', 'description', 'price', 'actions'];
  exampleDatabase: ProductService | null;
  snackBar: MatSnackBar |null;
  dataSource: TableDataSource | null;
  index: number;
  id: string;
  step = 0;

  constructor(public httpClient: HttpClient, public dialog: MatDialog,
              public productService: ProductService) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  ngOnInit() {  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  addProduct() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {  },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase.dataChange.value.push(this.productService.getDialogData());
        this.refreshTable();
      }
    });
  }

  addCategory() {
    const dialogRef = this.dialog.open(CategoryComponent, {
      data: {  },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase.dataChange.value.push(this.productService.getDialogData());
        this.refreshTable();
      }
    });
  }


  private refreshTable() {
    // Refreshing table using paginator
    // Thanks yeager-j for tips
    // https://github.com/marinantonio/angular-mat-table-crud/issues/12
    this.paginator._changePageSize(this.paginator.pageSize);
  }

/*   // If you don't need a filter or a pagination this can be simplified, you just use code from else block
    // OLD METHOD:
    // if there's a paginator active we're using it for refresh
    if (this.dataSource._paginator.hasNextPage()) {
      this.dataSource._paginator.nextPage();
      this.dataSource._paginator.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSource._paginator.hasPreviousPage()) {
      this.dataSource._paginator.previousPage();
      this.dataSource._paginator.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSource.filter = '';
      this.dataSource.filter = this.filter.nativeElement.value;
    }*/

 
}
