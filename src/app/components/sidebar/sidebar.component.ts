import { Component } from '@angular/core';
import { IUnitSideBar } from '../../interface/IUnitSideBar';
import { unitsSideBar } from './dataSideBar';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isShowUnitSideBar = false;
  activeListType = '';
  readonly dropDownIcon = faChevronDown;
  readonly unitsSideBar: IUnitSideBar[] = unitsSideBar;

  constructor() {
    const storedActiveListType = localStorage.getItem('activeListType');
    if (storedActiveListType) {
      this.activeListType = storedActiveListType;
    }
    const storedIsShowUnitSideBar = localStorage.getItem('isShowUnitSideBar');
    if (storedIsShowUnitSideBar) {
      this.isShowUnitSideBar = (storedIsShowUnitSideBar === 'true');
    }
  }

  toggleSideBar(listType: string) {
    if (listType === this.activeListType) {
      this.isShowUnitSideBar = !this.isShowUnitSideBar;
    } else {
      this.activeListType = listType;
      this.isShowUnitSideBar = true;
    }
    localStorage.setItem('activeListType', this.activeListType);
    localStorage.setItem('isShowUnitSideBar', this.isShowUnitSideBar.toString());
  }
}
