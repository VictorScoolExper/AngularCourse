import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  //template: '<app-server></app-server>',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer: boolean = false;
  serverCreationStatus = 'No server was created';
  serverName = 'Test1';
  serverCreated = false;
  servers = ['Test server 1', 'Test server 2'];

  constructor() {
    setTimeout(()=>{
      this.allowNewServer = true;
    },2000);
   }

  ngOnInit(): void {
  }

  onCreateServer(){
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = 'server was created, name is ' + this.serverName;
  }

  onUpdateServerName(event:any){
    // we verify that it will be type input.
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}
