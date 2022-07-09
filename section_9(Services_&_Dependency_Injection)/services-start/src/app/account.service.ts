import { EventEmitter, Injectable } from "@angular/core";
import { LoggingService } from "./logging.services";

//we attach metadata so LogginService works, so we can inject somthing
// only add when we expect something injected
@Injectable()
export class AccountsService {
    accounts = [
        {
            name: 'Master Account',
            status: 'active'
        },
        {
            name: 'Testaccount',
            status: 'inactive'
        },
        {
            name: 'Hidden Account',
            status: 'unknown'
        }
    ];
    // this below to emit a alert
    statusUpdated = new EventEmitter<string>();

    constructor(private logginService: LoggingService){}

    addAccount(name: string, status: string){
        this.accounts.push({name: name, status: status});
        this.logginService.logStatusChange(status);
    }

    updateStatus(id: number, status: string){
        this.accounts[id].status = status;
        this.logginService.logStatusChange(status);
    }
}