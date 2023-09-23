import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  pageSizeOptions = [5, 13, 15, 20, 100];
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

  @Input() getPcType: string;
  @Input() getPcTag: string;
  @Input() findServerByName: string;

  constructor(private serverPCService: ServerPCService) {
  }

  ngOnInit(): void {
    this.totalRecordsServer = this.serverPCService.getServerPC().length;
    this.totalPages = this.getTotalPages();
  }

  //переключения окна выбора количества записей
  togglePageSizeDropdown(): void {
    this.showPageSizeDropdown = !this.showPageSizeDropdown;
  };

  //выбор количества записей на странице
  selectPageSize(pageSize: number): void {
    this.numRecordsServer = pageSize;
    this.currentPage = 1;
    this.endIndex = this.numRecordsServer;
    this.showPageSizeDropdown = false;
    this.updateServerData();
  };

  //выбор страницы
  setPage(page: number): void {
    this.currentPage = page;
    this.updateServerData();
  }

  //обновление данных на странице
  updateServerData(): void {
    this.totalPages = this.getTotalPages();
    this.startIndex = this.getStartIndex();
    this.endIndex = this.getEndIndex();

    //отображение записей в завивмости от выбранного количества
    this.serverPCService
      .getPageData(this.startIndex, this.numRecordsServer)
      .pipe(takeUntil(this.destroy$))
      .subscribe((serverData: IServerData[]) => {
        this.serverPCService.serverPCdata$.next(serverData);
      });
  }

  //получение количества страниц
  getTotalPages(): number {
    return Math.ceil(this.totalRecordsServer / this.numRecordsServer);
  }

  //получение начального индекса "Запись с startIndex - endIndex"
  getStartIndex(): number {
    return (this.currentPage - 1) * this.numRecordsServer;
  }

  //получение конечного индекса "Запись с startIndex - endIndex"
  getEndIndex(): number {
    return Math.min(this.currentPage * this.numRecordsServer, this.totalRecordsServer);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
