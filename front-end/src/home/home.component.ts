import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { MatPaginator, MatSort, MatDatepicker, MatDatepickerInputEvent } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';


// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as moment from 'moment';


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
  styleUrls: ['./home.component.scss'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['product', 'quantity', 'total', 'cash', 'debit', 'credit'];
  dataSource = ELEMENT_DATA;
  loading = true;
  events: string[] = [];
  @Input() reportDayForm: FormGroup;
  @Input() cashierForm: FormGroup;
  @Input() dateValue: string;

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


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  constructor(private formBuilder: FormBuilder) {
    }

  ngOnInit() {

    this.loading = false;
    // this.managementService.onDataForHome();
    this.reportDayForm = this.formBuilder.group({
      dateDay: { value: '', disabled: true}
    });
    this.cashierForm = this.formBuilder.group({
      dateNow: { value: '', disabled: true}
    });
    }


  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.dateValue = moment(event.value).locale('pt-br').format('l');

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
