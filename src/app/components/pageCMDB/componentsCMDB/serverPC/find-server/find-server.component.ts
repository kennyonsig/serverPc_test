import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { faFilter } from '@fortawesome/free-solid-svg-icons/faFilter';
import { ServerPCService } from '../server-pc.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IServerData } from '../../../../../interface/IServerData';

@Component({
  selector: 'app-find-server',
  templateUrl: './find-server.component.html',
  styleUrls: ['./find-server.component.scss']
})
export class FindServerComponent implements OnInit, OnDestroy {
  readonly filterIcon = faFilter;
  isShowFilter = false;
  findServerByName: string;
  @Input() getPcType: string;
  @Input() getPcTag: string;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private serverPCService: ServerPCService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => {
        this.getPcType = params['pc_type'] || '';
        this.getPcTag = params['pc_tag'] || '';
        this.findServerByName = params['server_name'] || '';
        this.serverPCService.filterServerData(this.findServerByName, this.getPcType, this.getPcTag);
      });

    this.updateServerData();
  }

  updateServerData() {
    this.serverPCService.updateQueryParams(this.getPcType, this.getPcTag, this.findServerByName);
    this.serverPCService.filterServerData(
      this.findServerByName.trim().toLowerCase(),
      this.getPcType,
      this.getPcTag
    ).pipe(takeUntil(this.destroy$))
      .subscribe((filteredData: IServerData[]) => {
        this.serverPCService.serverPCdata$.next(filteredData);
      });
  }

  findServerInput() {
    this.updateServerData();
  }

  toggleFilter() {
    this.isShowFilter = !this.isShowFilter;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
