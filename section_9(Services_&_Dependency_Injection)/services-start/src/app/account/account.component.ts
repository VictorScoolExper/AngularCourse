import { Component, Input, Output } from '@angular/core';
import { AccountsService } from '../account.service';
import { LoggingService } from '../logging.services';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // this provides a service, tells angular how to create it
  //providers: [LoggingService]
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  constructor(private loggingService: LoggingService,
    private accountService: AccountsService){}

  onSetTo(status: string) {
    this.accountService.updateStatus(this.id, status);
    //this.loggingService.logStatusChange(status);
    // emits status
    this.accountService.statusUpdated.emit(status);
  }
}
