import { Component } from '@angular/core';
import { AccountsService } from '../account.service';
import { LoggingService } from '../logging.services';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // this provides a service, tells angular how to create it
  // we removed AccountsService from provider because in this project we loop at 
  // app.component and AccountServices no.
  //providers: [LoggingService]
})
export class NewAccountComponent {

  constructor(private loggingService: LoggingService,
    private accountService: AccountsService) {
      //subscribes to changes
    this.accountService.statusUpdated.subscribe(
      (status: string) => alert('New status ' + status)
    );
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.addAccount(accountName, accountStatus);
    //this.loggingService.logStatusChange(accountStatus)
  }
}
