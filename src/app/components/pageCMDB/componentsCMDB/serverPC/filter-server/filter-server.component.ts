import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { Subscription } from 'rxjs';
import { ServerPCService } from '../server-pc.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filter-server',
  templateUrl: './filter-server.component.html',
  styleUrls: ['./filter-server.component.scss']
})
export class FilterServerComponent implements OnInit, OnDestroy {

  readonly crossIcon = faXmark;
  showTypeDropdown = false;
  showTagDropdown = false;
  pcTypes = ['default', 'vm_host', 'vm_guest'];
  pcTags = ['red tag', 'blue tag', 'green tag', 'yellow tag', 'orange tag'];
  selectedType = '';
  selectedTag = '';

  @Output() isCloseFilter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() pcTag: EventEmitter<string> = new EventEmitter<string>();
  @Output() pcType: EventEmitter<string> = new EventEmitter<string>();
  @Input() findServer: string;

  private subParamFilter: Subscription;

  constructor(private serverPCService: ServerPCService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subParamFilter = this.route.queryParams.subscribe(params => {
      this.selectedType = params['pc_type'] || '';
      this.selectedTag = params['pc_tag'] || '';
    });
  }

  toggleTypeDropdown() {
    this.showTypeDropdown = !this.showTypeDropdown;
  }

  toggleTagDropdown() {
    this.showTagDropdown = !this.showTagDropdown;
  }

  selectType(pcType: string) {
    this.selectedType = pcType;
    this.showTypeDropdown = false;
  }

  selectTag(pcTag: string) {
    this.selectedTag = pcTag;
    this.showTagDropdown = false;
  }

  closeFilter() {
    this.isCloseFilter.emit();
  }

  useFilter() {
    this.pcTag.emit(this.selectedTag);
    this.pcType.emit(this.selectedType);
    this.serverPCService.updateQueryParams(this.selectedType, this.selectedTag, this.findServer);
  }

  clearFilter() {
    this.selectedType = '';
    this.selectedTag = '';
    this.serverPCService.clearQueryParams();
  }

  ngOnDestroy() {
    if (this.subParamFilter) {
      this.subParamFilter.unsubscribe();
    }
  }
}

