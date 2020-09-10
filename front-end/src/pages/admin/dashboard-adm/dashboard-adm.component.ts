import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../add/add-dialog.component';
import { CategoryComponent } from '../category/category.component';

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


  constructor(public httpClient: HttpClient, public dialog: MatDialog,
              public productService: ProductService) { }



  ngOnInit() {  }


  setStep(index: number) { this.step = index; }

  nextStep() { this.step++;}

  prevStep() {this.step--; }

  addProduct() {
    this.dialog.open(AddDialogComponent);
  }

  addCategory() {
    this.dialog.open(CategoryComponent);
  }

  onList(item: string){
    if(item.toString().toLowerCase() === 'products') {
      if(this.showList=== false){
        this.message='Products'
        this.showList=true;
      }else{
        this.showList = false;
      }

    } else if(item.toString().toLowerCase() === 'categories'){
      if(this.showList=== false){
        this.message = 'Categories'
        this.showList=true;
      }else{
        this.showList = false;
      }
    }
  }
}
