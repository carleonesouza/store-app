import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[choosing]'
})
export class ChoosingDirective {

  constructor(private el: ElementRef) { }

  @Input('choosing') choosing: string;

  @HostListener('mouseenter') onMouseEnter() {
    console.log(this.choosing);
  }

}
