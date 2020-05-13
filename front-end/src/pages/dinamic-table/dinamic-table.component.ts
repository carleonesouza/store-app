import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GenericDataSource } from '../../datasources/generic-datasource';
import { MatSnackBar } from '@angular/material';
import { StoreAppService } from 'src/services/store-app.service';


const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];


@Component({
  selector: 'dinamic-table',
  templateUrl: './dinamic-table.component.html',
  styleUrls: ['./dinamic-table.component.scss']
})
export class DinamicTableComponent implements OnInit {
  columns: Array<any> = [
    { name: 'position', label: 'No.' },
    { name: 'name', label: 'Name' },
    { name: 'weight', label: 'Weight' },
    { name: 'symbol', label: 'Symbol' }
  ];
  dataSour: GenericDataSource;
  errored = false;
  displayedColumns: string[] = this.columns.map(column => column.name);
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor(private snackBar: MatSnackBar, private StoreApp: StoreAppService) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('input', {static: true}) input: ElementRef;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSour = new GenericDataSource();

    this.StoreApp.getGenericAction('/wallet/bills')
    .subscribe( (bills) => {
      console.log(bills);
    });

    this.dataSour.setCallback((filter, pageIndex, pageSize) => {
        return this.StoreApp.fetchGenericDataList('/wallets', filter, pageIndex, pageSize);
    });

    this.dataSour.setErrorHandler((err) => {
        this.errored = true;
        this.snackBar.open('Failed to load promo codes!', 'RETRY', { duration: 5000 })
            .onAction().subscribe(() => {
                this.loadPage();
            });
    });

    this.dataSour.loadData('', 0, 25);

  }

  loadPage() {
    this.errored = false;
    this.dataSour.loadData(
        this.input.nativeElement.value,
        this.paginator.pageIndex,
        this.paginator.pageSize);
}


}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
