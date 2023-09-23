import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IServerData } from '../../../../../interface/IServerData';
import { ServerPCService } from '../server-pc.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-server-table',
  templateUrl: './server-table.component.html',
  styleUrls: ['./server-table.component.scss']
})
export class ServerTableComponent implements OnInit, OnDestroy {
  @Input() numRecordsServer: number;
  serverPCdata$: IServerData[];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private serverPCService: ServerPCService) {
  }

  ngOnInit() {
    this.serverPCService.serverPCdata$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: IServerData[]) => this.serverPCdata$ = data);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
