import { Component, OnInit } from '@angular/core';
import { ServerPCService } from '../server-pc.service';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';

@Component({
  selector: 'app-server-page',
  templateUrl: './server-page.component.html',
  styleUrls: ['./server-page.component.scss']
})
export class ServerPageComponent implements OnInit {
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
  }
}
