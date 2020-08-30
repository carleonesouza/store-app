import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TableDataSource } from 'src/services/table-data-source';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatAccordion } from '@angular/material/expansion';
import { EditDialogComponent } from '../edit/edit-dialog.component';
import { ImagesComponent } from 'src/pages/upload/images/images.component';
import { DeleteDialogComponent } from '../delete/delete-dialog.component';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

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

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  startEdit(i: number, _id: string, name: string, description: string, price: number) {
    this.id = _id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: { _id, name, description, price },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex((x) => x._id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.productService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  addImages(i: number, _id: string, name: string, description: string, price: number) {
    this.id = _id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    const dialogRef = this.dialog.open(ImagesComponent, {
      data: { _id, name, description, price },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex((x) => x._id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.productService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, _id: string, name: string, description: string, price: number) {
    this.index = i;
    this.id = _id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { _id, name, description, price },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex((x) => x._id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
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
}
is.filter.nativeElement.value;
    }*/

  public loadData() {
    this.exampleDatabase = new ProductService(this.httpClient, this.snackBar);
    this.dataSource = new TableDataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
}