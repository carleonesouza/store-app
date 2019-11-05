import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';

export interface PeriodicElement {
  name: string;
  quantity: number;
  total: number;
  cash: number;
  debit: number;
  credit: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Caraipa', quantity: 19, total: 10.00,  cash: 12, debit: 12, credit: 45},
  {name: 'Caraipa', quantity: 19, total: 10.00,  cash: 12, debit: 12, credit: 45},
  {name: 'Caraipa', quantity: 19, total: 10.00,  cash: 12, debit: 12, credit: 45},
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  today = new Date().toDateString();
  displayedColumns: string[] = ['product', 'quantity', 'total', 'cash', 'debit', 'credit'];
  dataSource = ELEMENT_DATA;

  constructor() {  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['Arraiana', 'Caraipa', 'Coroa Vermelha', 'Mucugê', 'Raiz Negra', 'Pitinga'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: '300m/L'},
    {data: [50, 54, 86, 71, 60, 54, 46], label: '500m/L'},
  ];

  public lineChartType = 'line';
  public lineChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: '300m/L'},
    {data: [50, 54, 86, 71, 60, 54, 46], label: '500m/L'},
  ];

  public lineChartLabels = ['Arraiana', 'Caraipa', 'Coroa Vermelha', 'Mucugê', 'Raiz Negra', 'Pitinga'];

  ngOnInit() {
  }
  getTotalQuantity() {
    return this.dataSource.map(t => t.quantity).reduce((acc, value) => acc + value, 0);
  }
  getTotalTotal() {
    return this.dataSource.map(t => t.total).reduce((acc, value) => acc + value, 0);
  }
  getTotalCash() {
    return this.dataSource.map(t => t.cash).reduce((acc, value) => acc + value, 0);
  }
  getTotalDebit() {
    return this.dataSource.map(t => t.debit).reduce((acc, value) => acc + value, 0);
  }
  getTotalCredit() {
    return this.dataSource.map(t => t.credit).reduce((acc, value) => acc + value, 0);
  }

}
