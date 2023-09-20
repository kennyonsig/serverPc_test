import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, map, Observable } from 'rxjs';
import { IServerData } from '../../../../interface/IServerData';
import { serversData } from '../../../../mock/dataServerPC';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ServerPCService {
  serverPCdata$: BehaviorSubject<IServerData[]> = new BehaviorSubject<IServerData[]>(serversData);

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  getServerPC(): IServerData[] {
    return this.serverPCdata$.getValue();
  }

  filterServerData(findServerName: string, pcType: string, pcTag: string) {
    const filteredServers: IServerData[] = serversData
      .filter((server: IServerData) =>
        server.serverName?.toLowerCase().includes(findServerName.toLowerCase()) &&
        (!pcType || server.serverType === pcType) &&
        (!pcTag || server.serverTag.includes(pcTag)));
    this.serverPCdata$.next(filteredServers);
  }


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

  clearQueryParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        server_name: '',
        pc_type: '',
        pc_tag: ''
      },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

  findServer(findServerName: string): Observable<IServerData[]> {
    return this.serverPCdata$.pipe(
      debounceTime(500),
      map((servers: IServerData[]) => {
        return servers.filter((server: IServerData) => server.serverName?.toLowerCase()
          .includes(findServerName.toLowerCase()));
      })
    );
  }
}
