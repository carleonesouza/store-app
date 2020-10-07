import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
slideIndex = 0;
  images =[
    {number:1, src:'https://www.w3schools.com/howto/img_5terre_wide.jpg'},
    {number:2, src:'https://www.w3schools.com/howto/img_mountains_wide.jpg'},
    {number:3, src:'https://www.w3schools.com/howto/img_lights_wide.jpg'},
    {number:4, src:'https://www.w3schools.com/howto/img_nature_wide.jpg'},
    {number:5, src:'https://www.w3schools.com/howto/img_snow_wide.jpg'}
  ]

  constructor(private _Activatedroute:ActivatedRoute, private host: ElementRef){ }



  ngOnInit() {

     this._Activatedroute.paramMap.subscribe(params => {

     });

  }



 plusSlides(n) {
  this.showSlides(this.slideIndex += n);
  console.log('N '+n);
  console.log(this.slideIndex);
}

currentSlide(n) {
  this.showSlides(this.slideIndex = n);
}

showSlides(n) {
  let i;
  const slides = this.host.nativeElement.getElementsByClassName('mySlides');

  if (n > slides.length) {this.slideIndex = 1}

  if (n < 1) {this.slideIndex = slides.length}

  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
  }
  slides[this.slideIndex-1].style.display = 'block';

}


}
