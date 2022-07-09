import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  // When ever a property changes the following code gets executed
  @Input() set appUnless(condition: boolean){
    if(!condition){
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }
  // the ViewContainerRef where it will be used, template ref will be what
  // will be used
  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }



}
