import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective {
    // The bottom codes keep the dropdown open when you click outside area
    // attaching open to css class
    // @HostBinding('class.open') isOpen = false;

    // @HostListener('click') toggleOpen(){
    //     this.isOpen = !this.isOpen;
    // }

    // The dropdown button will close when you click outside
    @HostBinding('class.open') isOpen = false;
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }
    constructor(private elRef: ElementRef) { }
}