import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EditDialogComponent } from '../edit/edit-dialog.component';
import { ImagesComponent } from 'src/pages/upload/images/images.component';
import { DeleteDialogComponent } from '../delete/delete-dialog.component';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { StoreAppService } from 'src/services/store-app.service';
import { Product } from 'src/models/product.model';
import { CurrencyPipe } from '@angular/common';
import { TableDataSource } from 'src/services/table-data-source';
import { Category } from 'src/models/category';
import { DataSource } from '@angular/cdk/table';
import { of } from 'rxjs';



@Component({
  selector: 'list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [CurrencyPipe]
})
export class ListComponent implements OnInit, AfterContentInit {

  columns = [
    { columnDef: 'name', header: 'Name',    cell: (element: Product) => `${element.name}` },
    { columnDef: 'description',     header: 'Description',   cell: (element: Product) => `${element.description}`     },
    { columnDef: 'price',   header: 'Price', cell: (element: Product) => `${element.price}`   },
    { columnDef: 'category',   header: 'Category', cell: (element: Product) => `${element.category.name}`   },
    { columnDef: 'actions',   header: 'Actions', cell: (element: Product) => ``   },
  ];

  displayedColumns = this.columns.map(c => c.columnDef);
  dataSource;
  exampleDatabase: ProductService | null;
  id: string;
  title;
  step = 0;
  cols: any[];

  loading = true;

  constructor(public httpClient: HttpClient, public dialog: MatDialog, private currencyPipe: CurrencyPipe,
              private productService: ProductService, private storeAppService: StoreAppService) { }

@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
@ViewChild('filter', { static: true }) filter: ElementRef

@Input('choose') choose: string;


  ngOnInit() {
  }

  ngAfterContentInit(){
    if(this.choose !== null && this.choose ==='Products' ){
      this.onLoadProductsList();
    }else if(this.choose !== null && this.choose ==='Categories' ){
      this.onLoadCategoriesList();
  }
  };

  refresh() {
    this.loadData();
  }

  onLoadCategoriesList(){
    this.storeAppService.getGenericAction('/categories')
    .pipe()
    .subscribe((data) => {
      if(!data){
        this.loading = true;
      }else {
        this.title = 'Categories';
        const category = new Category(data);
        // this.dataSource = new BehaviorSubject<Product[]>(data);
        const forDeletion = ['productId', '_id']
        // this.displayedColumns = Object.getOwnPropertyNames(category);
        this.cols = Object.getOwnPropertyNames(category);
        this.cols.push('actions');
        // this.displayedColumns = this.cols.filter(item => !forDeletion.includes(item));
        this.loading = false;
      }
    });
  }

  onLoadProductsList(){
    this.storeAppService.getGenericAction('/products')
    .pipe()
    .subscribe((data) => {
      if(!data){
        this.loading = true;
      } else {
        data.map((product: Product) => {
          if(product.category !== null){
            this.storeAppService.getGenericAction(`/categories/${product.category}`)
            .pipe()
            .subscribe((category: Category) =>{
              if(category._id === product.category){
                product.category = category;
              }
            });
          }
            product.price = this.currencyPipe.transform(product.price, 'BRL', 'symbol-narrow', '1.2-2');
          });
        this.title = 'Products';
        this.dataSource = new BehaviorSubject<Product[]>(data);
        this.loading = false;
      }
    });

  }

  startEdit(element) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: element,
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

  addImages(element) {
    const dialogRef = this.dialog.open(ImagesComponent, {
      data: element
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

  deleteItem(element) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: element
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

/*   // If you don'tExampleDataSource need a filter or a pagination this can be simplified, you just use code from else block
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
