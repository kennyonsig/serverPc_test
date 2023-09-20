import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//component
import { ServerPageComponent } from './components/pageCMDB/componentsCMDB/serverPC/server-page/server-page.component';
import { AdministartionComponent } from './components/page/unusePages/administartion/administartion.component';
import { DashboardComponent } from './components/page/unusePages/dashboard/dashboard.component';
import { WebComponent } from './components/page/unusePages/web/web.component';
import { GuideComponent } from './components/page/unusePages/guide/guide.component';
import { ReportsComponent } from './components/page/unusePages/reports/reports.component';
import { MonitoringComponent } from './components/page/unusePages/monitoring/monitoring.component';
import { AutomationComponent } from './components/page/unusePages/automation/automation.component';
import {
  HypervisorsVmPageComponent
} from './components/pageCMDB/componentsCMDB/hypervisorVM/hypervisors-vm-page/hypervisors-vm-page.component';
import {
  PrintersMfpComponent
} from './components/pageCMDB/componentsCMDB/printersMFP/printers-mfp/printers-mfp.component';
import {
  NetworkDevicesComponent
} from './components/pageCMDB/componentsCMDB/networkDevices/network-devices/network-devices.component';
import { CmdbComponent } from './components/pageCMDB/cmdb/cmdb.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'cmdb',
    component: CmdbComponent,
    children: [
      { path: 'server-pc', component: ServerPageComponent },
      { path: 'hypervisors-vm', component: HypervisorsVmPageComponent },
      { path: 'printers-mfp', component: PrintersMfpComponent },
      { path: 'network-devices', component: NetworkDevicesComponent }
    ]
  },
  {
    path: 'web',
    component: WebComponent
  },
  {
    path: 'guide',
    component: GuideComponent
  },
  {
    path: 'reports',
    component: ReportsComponent
  },
  {
    path: 'monitoring',
    component: MonitoringComponent
  },
  {
    path: 'automation',
    component: AutomationComponent
  },
  {
    path: 'administration',
    component: AdministartionComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
