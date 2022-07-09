import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class UserService{
    // these type subjects are perfect for event emitters
    // never use event emitter, subjects are better
    activatedEmitter = new Subject<boolean>();


    // Note: you cannot use subjects when using @Output. Only for comunication
    // for cross components.
}