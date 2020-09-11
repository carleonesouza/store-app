import { Component, OnInit, ViewChild, ElementRef, Input, AfterContentInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EditDialogComponent } from '../edit/edit-dialog.component';
import { ImagesComponent } from 'src/pages/upload/images/images.component';
import { DeleteDialogComponent } from '../delete/delete-dialog.component';
import { StoreAppService } from 'src/services/store-app.service';
import { Product } from 'src/models/product.model';
import { CurrencyPipe } from '@angular/common';
import { Category } from 'src/models/category';
import { MatTableDataSource } from '@angular/material/table';
import { CATEGORY, PRODUCT } from 'src/utils/constants';



@Component({
  selector: 'list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [CurrencyPipe]
})
export class ListComponent implements OnInit, AfterContentInit {

  columns = [
    { columnDef: 'name', header: 'Name', cell: (element: Product) => `${element.name}` },
    { columnDef: 'description', header: 'Description', cell: (element: Product) => `${element.description}` },
    { columnDef: 'price', header: 'Price', cell: (element: Product) => `${element.price}` },
    { columnDef: 'category', header: 'Category', cell: (element: Product) => `${element.category.name}` },
    { columnDef: 'actions', header: 'Actions', cell: () => `` },
  ];

  displayedColumns = this.columns.map(c => c.columnDef);
  dataSource = new MatTableDataSource();
  title: string;
  step = 0;
  cols: any[];
  loading = true;

  constructor(public dialog: MatDialog, private currencyPipe: CurrencyPipe, private storeAppService: StoreAppService) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  @Input('choose') choose: string;


  ngOnInit() { }

  ngAfterContentInit() {
    if (this.choose !== null && this.choose === 'Product') {
      this.onLoadProductsList();
    } else if (this.choose !== null && this.choose === 'Category') {
      this.onLoadCategoriesList();
    }

  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onLoadCategoriesList() {
    this.storeAppService.getGenericAction('/categories')
      .pipe()
      .subscribe((data) => {
        if (!data) {
          this.loading = true;
        } else {
          this.title = CATEGORY;
          const category = new Category(data);
          this.dataSource = new MatTableDataSource(data);
          const forDeletion = ['productId', '_id', 'categoryFields']
          this.displayedColumns = Object.getOwnPropertyNames(category);
          this.cols = Object.getOwnPropertyNames(category);
          this.cols.push('actions');
          this.displayedColumns = this.cols.filter(item => !forDeletion.includes(item));
          this.loading = false;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }

  onLoadProductsList() {
    this.storeAppService.getGenericAction('/products')
      .pipe()
      .subscribe((data) => {
        if (!data) {
          this.loading = true;
        } else {
          data.map((product: Product) => {
            if (product.category !== null) {
              this.storeAppService.getGenericAction(`/categories/${product.category}`)
                .pipe()
                .subscribe((category: Category) => {
                  if (category._id === product.category) {
                    product.category = category;
                    this.loading = false;
                  }
                });
            }
            product.price = this.currencyPipe.transform(product.price, 'BRL', 'symbol-narrow', '1.2-2');
          });
          this.title = PRODUCT;
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });

  }

  startEdit(element: any) {
    this.dialog.open(EditDialogComponent, {
      data: element,
    });
  }

  addImages(element: any) {
    this.dialog.open(ImagesComponent, {
      data: element
    });
  }

  deleteItem(element: any) {
    this.dialog.open(DeleteDialogComponent, {
      data: element
    });
  }


}
