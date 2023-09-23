import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { Subject, takeUntil } from 'rxjs';
import { ServerPCService } from '../server-pc.service';
import { ActivatedRoute } from '@angular/router';
import { IServerData } from '../../../../../interface/IServerData';

@Component({
  selector: 'app-filter-server',
  templateUrl: './filter-server.component.html',
  styleUrls: ['./filter-server.component.scss']
})
export class FilterServerComponent implements OnInit, OnDestroy {

  readonly crossIcon = faXmark;
  readonly pcTypes = ['default', 'vm_host', 'vm_guest'];
  readonly pcTags = ['red tag', 'blue tag', 'green tag', 'yellow tag', 'orange tag'];
  showTypeDropdown = false;
  showTagDropdown = false;
  selectedType = '';
  selectedTag = '';
  destroy$: Subject<boolean> = new Subject<boolean>();

  @Output() isCloseFilter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() pcTag: EventEmitter<string> = new EventEmitter<string>();
  @Output() pcType: EventEmitter<string> = new EventEmitter<string>();
  @Input() findServer: string;

  constructor(private serverPCService: ServerPCService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.selectedTag = params['pc_tag'] || '';
        this.selectedType = params['pc_type'] || '';
      });
  }

  //скрыть/показать список типов
  toggleTypeDropdown() {
    this.showTypeDropdown = !this.showTypeDropdown;
  }

  //скрыть/показать список тегов
  toggleTagDropdown() {
    this.showTagDropdown = !this.showTagDropdown;
  }

  //выбрать тип
  selectType(pcType: string) {
    this.selectedType = pcType;
    this.showTypeDropdown = false;
  }

  //выбрать тег
  selectTag(pcTag: string) {
    this.selectedTag = pcTag;
    this.showTagDropdown = false;
  }

  //закрыть фильтр
  closeFilter() {
    this.isCloseFilter.emit();
  }

  //применить фильтры
  useFilter() {
    this.pcTag.emit(this.selectedTag);
    this.pcType.emit(this.selectedType);
    this.updateServerData();
  }

  //очистить фильтры и params фильтров
  clearFilter() {
    this.selectedType = '';
    this.selectedTag = '';
    this.serverPCService.clearQueryParams();
    this.updateServerData();
  }

  //обновление данных params и фильтрации записей
  updateServerData() {
    this.serverPCService.updateQueryParams(this.selectedType, this.selectedTag, this.findServer);
    this.serverPCService.filterServerData(
      this.findServer.trim().toLowerCase(),
      this.selectedType,
      this.selectedTag
    ).pipe(takeUntil(this.destroy$))
      .subscribe((filteredData: IServerData[]) => {
        this.serverPCService.serverPCdata$.next(filteredData);
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

