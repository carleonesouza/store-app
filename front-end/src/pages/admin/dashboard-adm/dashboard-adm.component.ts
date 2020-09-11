import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../add/add-dialog.component';
import { PRODUCT, CATEGORY } from '../../../utils/constants'

@Component({
  selector: 'dashboard-adm',
  templateUrl: './dashboard-adm.component.html',
  styleUrls: ['./dashboard-adm.component.scss'],
})

export class DashboardAdmComponent implements OnInit {

  index: number;
  id: string;
  showList= false;
  step = 0;
  message: string;


  constructor(public dialog: MatDialog) { }

  ngOnInit() {  }

  setStep(index: number) { this.step = index; }

  nextStep() { this.step++;}

  prevStep() {this.step--; }

  addProduct() {
    this.dialog.open(AddDialogComponent, {
      data: PRODUCT
    });
  }

  addCategory() {
    this.dialog.open(AddDialogComponent, {
      data: CATEGORY
    });
  }

  onList(item: string){

    if(item.toString().toLowerCase() === PRODUCT.toString().toLowerCase()) {
      if(this.showList=== false){
        this.message=PRODUCT;
        this.showList=true;
      }else{
        this.showList = false;
      }

    } else if(item.toString().toLowerCase() === CATEGORY.toString().toLowerCase()){
      if(this.showList=== false){
        this.message = CATEGORY;
        this.showList=true;
      }else{
        this.showList = false;
      }
    }
  }
}
