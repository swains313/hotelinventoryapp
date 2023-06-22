import { style } from '@angular/animations';
import { Directive, ElementRef, HostListener, Inject, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective implements   OnInit{

  @Input() color: string='blue';

  //@Input() appHover: string='red';  we can use same variable name


  // , @Inject(Document) private document:Document useing this i can used DOM properties

  constructor(private element:ElementRef,private renderer:Renderer2) {
    console.log(this.element);
   }


  ngOnInit(): void {
    // this.element.nativeElement.style.backgroundColor=this.color;
    this.renderer.setStyle(this.element.nativeElement,'backgroundColor',this.color);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.element.nativeElement,'backgroundColor','pink');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.element.nativeElement,'backgroundColor','white');
  }




}
