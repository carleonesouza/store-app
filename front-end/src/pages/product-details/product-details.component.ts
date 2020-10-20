import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"],
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {
  slideIndex = 0;
  slides: string | any[];
  images = [
    { number: 1, src: "https://www.w3schools.com/howto/img_5terre_wide.jpg" },
    {
      number: 1,
      src: "https://www.w3schools.com/howto/img_mountains_wide.jpg",
    },
    { number: 1, src: "https://www.w3schools.com/howto/img_lights_wide.jpg" },
    { number: 1, src: "https://www.w3schools.com/howto/img_nature_wide.jpg" },
    { number: 1, src: "https://www.w3schools.com/howto/img_snow_wide.jpg" },
  ];

  constructor(private _Activatedroute: ActivatedRoute, private host: ElementRef
  ) {}
 
  ngOnInit() {
    this._Activatedroute.paramMap.subscribe((params) => {});
    
  }
  ngAfterViewInit(): void {
    this.slides = this.host.nativeElement.getElementsByClassName("show");
    this.showSlides(1);
  }


  plusSlides(n: number) {
    this.showSlides((this.slideIndex += n));
  }

  currentSlide(n: number) {
    console.log('Current '+ this.slideIndex);
    this.showSlides((this.slideIndex = n));
  }

  showSlides(n: number) { 

    if (n > this.slides.length) {
      this.slideIndex = 1;
    }

    if (n < 1) {
      this.slideIndex = this.slides.length;
    }

    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].style.display = "none";
    }
    this.slides[this.slideIndex - 1].style.display = "block";
  }
}
