import { Component, OnInit, ViewChild, ElementRef, Input, AfterContentInit } from '@angular/core';
import { MatPaginator, MatSort, MatDatepickerInputEvent, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';


// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as moment from 'moment';
import { ManagementService } from 'src/services/management.service';
import { HomeDataSource } from 'src/services/home-data-source';
import { HttpClient } from '@angular/common/http';
import { HandleError } from 'src/services/handleError';
import { fromEvent } from 'rxjs';
import { ProductService } from 'src/services/product.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class HomeComponent implements OnInit, AfterContentInit {
  displayedColumns: string[] = ['name', 'quantity', 'total'];
  exampleDatabase: ManagementService | null;
  dataSource: HomeDataSource | null;
  loading = true;
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
    { data: [65, 59, 80, 81, 56, 55, 40], label: '300m/L' },
    { data: [50, 54, 86, 71, 60, 54, 46], label: '500m/L' },
  ];

  public lineChartType = 'line';
  public lineChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: '300m/L' },
    { data: [50, 54, 86, 71, 60, 54, 46], label: '500m/L' },
  ];

  public lineChartLabels = ['Arraiana', 'Caraipa', 'Coroa Vermelha', 'Mucugê', 'Raiz Negra', 'Pitinga'];


  constructor(private formBuilder: FormBuilder, private managementService: ManagementService,
              private snackBar: MatSnackBar, public httpClient: HttpClient,
              private myHandleError: HandleError, private productService: ProductService) { }


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  ngOnInit() {

    this.loading = false;
    this.reportDayForm = this.formBuilder.group({
      dateDay: { value: '', disabled: true }
    });
    this.cashierForm = this.formBuilder.group({
      dateNow: { value: '', disabled: true }
    });
    const date = moment('2019.11.07', moment.defaultFormat).toDate();
    this.managementService.onVenderHome(moment(date).locale('pt-br').format('l'));

  }

  ngAfterContentInit() {
    this.loadData();
}

  refresh() {
    this.loadData();
  }



  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.dateValue = moment(event.value).locale('pt-br').format('l');
  }

  onGenerate() {
    if (!this.dateValue) {
      this.snackBar.open('You have to choose a date', '', { duration: 3000 });
    } else {
      this.managementService.onDataForHome(this.dateValue);
      this.managementService.onVenderHome(this.dateValue);
    }
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

public loadData() {
  this.exampleDatabase = new ManagementService(this.httpClient, this.snackBar, this.myHandleError, this.productService);
  this.dataSource = new HomeDataSource(this.exampleDatabase, this.paginator, this.sort);
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
