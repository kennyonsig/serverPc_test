import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServerPCService } from '../server-pc.service';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { IServerData } from '../../../../../interface/IServerData';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-server-page',
  templateUrl: './server-page.component.html',
  styleUrls: ['./server-page.component.scss']
})
export class ServerPageComponent implements OnInit, OnDestroy {
  pageSizeOptions = [13, 15, 20];
  numRecordsServer = 13;
  startIndex = 0;
  endIndex = this.numRecordsServer;
  currentPage = 1;

  totalRecordsServer: number;
  showPageSizeDropdown = false;
  totalPages: number;
  destroy$: Subject<boolean> = new Subject<boolean>();
  readonly arrowLeftIcon = faChevronLeft;
  readonly arrowRightIcon = faChevronRight;

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
    this.currentPage = 1;
    this.endIndex = this.numRecordsServer;
    this.showPageSizeDropdown = false;
    this.updateServerData();
  };

  setPage(page: number) {
    this.currentPage = page;
    this.updateServerData();
  }

  updateServerData(): void {
    this.totalPages = Math.ceil(this.totalRecordsServer / this.numRecordsServer);
    this.startIndex = (this.currentPage - 1) * this.numRecordsServer;
    this.endIndex = Math.min(this.currentPage * this.numRecordsServer, this.totalRecordsServer);

    this.serverPCService
      .getPageData(this.startIndex, this.numRecordsServer)
      .pipe(takeUntil(this.destroy$))
      .subscribe((serverData: IServerData[]) => {
        this.serverPCService.serverPCdata$.next(serverData);
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
