import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, map, Observable, of } from 'rxjs';
import { IServerData } from '../../../../interface/IServerData';
import { serversData } from '../../../../mock/dataServerPC';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ServerPCService {
  private readonly serverPCdata: IServerData[] = serversData;
  serverPCdata$: BehaviorSubject<IServerData[]> = new BehaviorSubject<IServerData[]>(this.serverPCdata);

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  //получение записей
  getServerPC(): IServerData[] {
    return this.serverPCdata$.getValue();
  }

  // обновление params
  updateQueryParams(pcType: string, pcTag: string, findServerName: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        server_name: findServerName,
        pc_type: pcType,
        pc_tag: pcTag
      },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

  //очистка params
  clearQueryParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { server_name: '', pc_type: '', pc_tag: '' },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

  //фильтрация таблицы
  filterServerData(findServerName: string, pcType: string, pcTag: string): Observable<IServerData[]> {
    return of(this.serverPCdata).pipe(
      debounceTime(200),
      map((servers: IServerData[]) => {
        return servers.filter((server: IServerData) =>
          server.serverName?.toLowerCase().includes(findServerName) &&
          (!pcType || server.serverType === pcType) &&
          (!pcTag || server.serverTag.includes(pcTag)));
      })
    );
  }

  getPageData(startIndex: number, numRecords: number): Observable<IServerData[]> {
    return of(this.serverPCdata.slice(startIndex, startIndex + numRecords));
  }
}
