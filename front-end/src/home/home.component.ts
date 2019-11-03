import { Component, OnInit
} from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  today = new Date().toDateString();


  constructor() {  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['Arraiana', 'Caraipa', 'Coroa Vermelha', 'Mucugê', 'Raiz Negra', 'Pitinga'];
  public barChartType = 'line';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: '300m/L'},
    {data: [50, 54, 86, 71, 60, 54, 46], label: '500m/L'},
  ];

  public pieChartLabels = ['Arraiana', 'Caraipa', 'Coroa Vermelha', 'Mucugê', 'Raiz Negra', 'Pitinga'];
  public pieChartData = [120, 150, 180, 90, 10, 11];
  public pieChartType = 'pie';

  ngOnInit() {
  }


}
