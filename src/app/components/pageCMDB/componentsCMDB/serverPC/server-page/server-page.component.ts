import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServerPCService } from '../server-pc.service';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { IServerData } from '../../../../../interface/IServerData';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-server-page',
  templateUrl: './server-page.component.html',
  styleUrls: ['./server-page.component.scss']
})
export class ServerPageComponent implements OnInit, OnDestroy {
  showPageSizeDropdown = false;
  pageSizeOptions = [13, 15, 20];
  numRecordsServer = 13;
  totalRecordsServer: number;
  startIndex = 0;
  endIndex = this.numRecordsServer;
  totalPages: number;
  currentPage = 1;
  readonly arrowLeftIcon = faChevronLeft;
  readonly arrowRightIcon = faChevronRight;
  private subElementPage: Subscription;

  constructor(private serverPCService: ServerPCService) {
  }

  ngOnInit() {
    this.totalRecordsServer = this.serverPCService.getServerPC().length;
    this.totalPages = Math.ceil(this.totalRecordsServer / this.numRecordsServer);
  }

  togglePageSizeDropdown() {
    this.showPageSizeDropdown = !this.showPageSizeDropdown;
  };

  selectPageSize(pageSize: number): void {
    this.numRecordsServer = pageSize;
    this.endIndex = this.numRecordsServer;
    this.showPageSizeDropdown = false;
    this.totalPages = Math.ceil(this.totalRecordsServer / this.numRecordsServer);
  };

  setPage(page: number) {
    this.currentPage = page;
    this.startIndex = (page - 1) * this.numRecordsServer;
    this.endIndex = Math.min(page * this.numRecordsServer, this.totalRecordsServer);

    this.subElementPage = this.serverPCService.getPageData(this.startIndex, this.numRecordsServer).subscribe((serverData: IServerData[]) => {
      this.serverPCService.serverPCdata$.next(serverData);
    });
  }

  ngOnDestroy() {
    if (this.subElementPage) {
      this.subElementPage.unsubscribe();
    }
  }
}
