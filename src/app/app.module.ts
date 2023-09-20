import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ServerPageComponent } from './components/pageCMDB/componentsCMDB/serverPC/server-page/server-page.component';
import { FindServerComponent } from './components/pageCMDB/componentsCMDB/serverPC/find-server/find-server.component';
import {
  FilterServerComponent
} from './components/pageCMDB/componentsCMDB/serverPC/filter-server/filter-server.component';
import {
  ServerTableComponent
} from './components/pageCMDB/componentsCMDB/serverPC/server-table/server-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardComponent } from './components/page/unusePages/dashboard/dashboard.component';
import { WebComponent } from './components/page/unusePages/web/web.component';
import { ReportsComponent } from './components/page/unusePages/reports/reports.component';
import { MonitoringComponent } from './components/page/unusePages/monitoring/monitoring.component';
import { AutomationComponent } from './components/page/unusePages/automation/automation.component';
import { AdministartionComponent } from './components/page/unusePages/administartion/administartion.component';
import { GuideComponent } from './components/page/unusePages/guide/guide.component';
import { CmdbComponent } from './components/pageCMDB/cmdb/cmdb.component';
import { HypervisorsVmPageComponent } from './components/pageCMDB/componentsCMDB/hypervisorVM/hypervisors-vm-page/hypervisors-vm-page.component';
import { NetworkDevicesComponent } from './components/pageCMDB/componentsCMDB/networkDevices/network-devices/network-devices.component';
import { PrintersMfpComponent } from './components/pageCMDB/componentsCMDB/printersMFP/printers-mfp/printers-mfp.component';
import { CutWordPipe } from './components/pageCMDB/componentsCMDB/serverPC/cut-word.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ServerPageComponent,
    FindServerComponent,
    FilterServerComponent,
    ServerTableComponent,
    DashboardComponent,
    WebComponent,
    ReportsComponent,
    MonitoringComponent,
    AutomationComponent,
    AdministartionComponent,
    GuideComponent,
    CmdbComponent,
    HypervisorsVmPageComponent,
    NetworkDevicesComponent,
    PrintersMfpComponent,
    CutWordPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
