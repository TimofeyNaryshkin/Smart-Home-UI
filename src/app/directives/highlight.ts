import { Directive, ElementRef, inject, input, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class Highlight {
  private el = inject(ElementRef);
  appHighlight = input<boolean>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['appHighlight']) {
      this.updateHighlight()
    }
  }

  private updateHighlight() {
    if (this.appHighlight()) {
      this.el.nativeElement.style.boxShadow = '0 0 1rem orange';
      this.el.nativeElement.style.transition = 'box-shadow 0.3s ease';
    } else {
      this.el.nativeElement.style.boxShadow = '';
    }
  }
}
