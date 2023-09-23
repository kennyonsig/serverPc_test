import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { faFilter } from '@fortawesome/free-solid-svg-icons/faFilter';
import { ServerPCService } from '../server-pc.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
  private subParams: Subscription;
  private filterSubscription: Subscription;

  constructor(private serverPCService: ServerPCService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subParams = this.route.queryParams.subscribe(params => {
      this.getPcType = params['pc_type'] || '';
      this.getPcTag = params['pc_tag'] || '';
      this.findServerByName = params['server_name'] || '';
      this.serverPCService.filterServerData(this.findServerByName, this.getPcType, this.getPcTag);
    });
  }

  findServerInput() {
    this.serverPCService.updateQueryParams(this.getPcType, this.getPcTag, this.findServerByName);
    this.filterSubscription = this.serverPCService.filterServerData(
      this.findServerByName.trim().toLowerCase(),
      this.getPcType,
      this.getPcTag
    ).subscribe((filteredData: IServerData[]) => {
      this.serverPCService.serverPCdata$.next(filteredData);
    });
  }

  toggleFilter() {
    this.isShowFilter = !this.isShowFilter;
  }

  ngOnDestroy() {
    if (this.subParams) {
      this.subParams.unsubscribe();
    }
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }
}
