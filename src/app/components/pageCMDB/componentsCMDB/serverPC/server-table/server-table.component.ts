import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IServerData } from '../../../../../interface/IServerData';
import { ServerPCService } from '../server-pc.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-server-table',
  templateUrl: './server-table.component.html',
  styleUrls: ['./server-table.component.scss']
})
export class ServerTableComponent implements OnInit, OnDestroy {
  @Input() numRecordsServer: number;
  serverPCdata$: IServerData[];
  private subTableServerData: Subscription;

  constructor(private serverPCService: ServerPCService) {
  }

  ngOnInit() {
    this.subTableServerData = this.serverPCService.serverPCdata$.subscribe((data: IServerData[]) => this.serverPCdata$ = data);
  }

  ngOnDestroy() {
    if (this.subTableServerData) {
      this.subTableServerData.unsubscribe();
    }
  }
}
