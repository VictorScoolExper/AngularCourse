import {Component, EventEmitter, Output } from '@angular/core';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent {
    //create a event emitter so our app.component can see
    //Output lets the parent component listen
    @Output() featureSelected = new EventEmitter<string>();

    onSelect(feature:string){
        //emit event
        this.featureSelected.emit(feature);
    }

}