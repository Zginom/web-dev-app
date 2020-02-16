import { Directive, ElementRef, Input, Renderer } from '@angular/core';

@Directive({
    selector: '[appSetColor]'
})
export class SetColorDirective {

    @Input() set appSetColor(value) {
        this.renderer.setElementStyle(
            this.element.nativeElement,
            'background-color',
            value
        );
    };

    constructor(
        private renderer: Renderer,
        private element: ElementRef
    ) { }

}
