import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    // the [] tell angular to use as an attribute
    selector: '[appBasicHighlight]'
})

export class BasicHighlightDirective implements OnInit {

    constructor(private elementRef: ElementRef){}

    ngOnInit(): void {
        this.elementRef.nativeElement.style.backgroundColor = 'green';
    }

}