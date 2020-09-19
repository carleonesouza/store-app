import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/models/product.model';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private _Activatedroute:ActivatedRoute){ }



  ngOnInit() {

     this._Activatedroute.paramMap.subscribe(params => {
        console.log(params);

     });

  }


}
