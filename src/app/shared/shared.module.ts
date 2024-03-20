import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { HighchartsChartModule } from 'highcharts-angular';
import { HttpClientModule } from '@angular/common/http';
import { InfluxdbService } from '../influxdb.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, Routes }   from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { F2Horno2VoltageComponent } from './widgets/f2-horno2-voltage/f2-horno2-voltage.component';
import { F2Horno2PotenciaComponent } from './widgets/f2-horno2-potencia/f2-horno2-potencia.component';
import { F2Horno2EnergiaComponent } from './widgets/f2-horno2-energia/f2-horno2-energia.component';
import { F2Horno2CorrienteComponent } from './widgets/f2-horno2-corriente/f2-horno2-corriente.component';
import { F2SiloCoheteComponent } from './widgets/f2-silo-cohete/f2-silo-cohete.component';
import { F2SiloNorteComponent } from './widgets/f2-silo-norte/f2-silo-norte.component';
import { F2SiloSurComponent } from './widgets/f2-silo-sur/f2-silo-sur.component';
import { F2SiloCoheteBarraComponent } from './widgets/f2-silo-cohete-barra/f2-silo-cohete-barra.component';
import { F2SiloNorteBarraComponent } from './widgets/f2-silo-norte-barra/f2-silo-norte-barra.component';
import { F2SiloSurBarraComponent } from './widgets/f2-silo-sur-barra/f2-silo-sur-barra.component';
import { F2Horno1CorrienteComponent } from './widgets/f2-horno1-corriente/f2-horno1-corriente.component';
import { F2Horno1EnergiaComponent } from './widgets/f2-horno1-energia/f2-horno1-energia.component';
import { F2Horno1PotenciaComponent } from './widgets/f2-horno1-potencia/f2-horno1-potencia.component';
import { F2Horno1VoltageComponent } from './widgets/f2-horno1-voltage/f2-horno1-voltage.component';

import { F2SiloCoheteCSComponent } from './connection_status/f2-silo-cohete-cs/f2-silo-cohete-cs.component';
import { F2SiloSurCSComponent } from './connection_status/f2-silo-sur-cs/f2-silo-sur-cs.component';
import { F2SiloNorteCSComponent } from './connection_status/f2-silo-norte-cs/f2-silo-norte-cs.component';
import { F2Horno1CSComponent } from './connection_status/f2-horno1-cs/f2-horno1-cs.component';
import { F2Horno2CSComponent } from './connection_status/f2-horno2-cs/f2-horno2-cs.component';
import { F2TtHorno1Component } from './widgets/f2-tt-horno1/f2-tt-horno1.component';
import { F2TtHorno2Component } from './widgets/f2-tt-horno2/f2-tt-horno2.component';
import { F2TtHorno1CsComponent } from './connection_status/f2-tt-horno1-cs/f2-tt-horno1-cs.component';
import { F2TtHorno2CsComponent } from './connection_status/f2-tt-horno2-cs/f2-tt-horno2-cs.component';
import { DescargaComponent } from './components/descarga/descarga.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats, MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

import { DateFnsAdapter, DateFnsModule } from '@angular/material-date-fns-adapter';
import { es } from 'date-fns/locale';

// export const DATE_FORMATS: MatDateFormats = {
//   parse: { dateInput: 'dd-MM-yyyy' },
//   display: {
//     dateInput: 'dd-MM-yyyy',
//     monthYearLabel: 'MMM yyyy',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'yyyy'
//   }
// }

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    F2Horno2VoltageComponent,
    F2Horno2PotenciaComponent,
    F2Horno2EnergiaComponent,
    F2Horno2CorrienteComponent,
    F2SiloCoheteComponent,
    F2SiloNorteComponent,
    F2SiloSurComponent,
    F2SiloCoheteBarraComponent,
    F2SiloNorteBarraComponent,
    F2SiloSurBarraComponent,
    F2Horno1CorrienteComponent,
    F2Horno1EnergiaComponent,
    F2Horno1PotenciaComponent,
    F2Horno1VoltageComponent,
    F2SiloCoheteCSComponent,
    F2SiloSurCSComponent,
    F2SiloNorteCSComponent,
    F2Horno1CSComponent,
    F2Horno2CSComponent,
    F2TtHorno1Component,
    F2TtHorno2Component,
    F2TtHorno1CsComponent,
    F2TtHorno2CsComponent,
    DescargaComponent,
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    HighchartsChartModule,
    HttpClientModule,
    MatSidenavModule,
    MatExpansionModule,
    MatTooltipModule,
    RouterModule.forRoot([]),
    MatDatepickerModule,
    
    MatNativeDateModule,
    MatFormFieldModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    F2Horno2VoltageComponent,
    F2Horno2PotenciaComponent,
    F2Horno2EnergiaComponent,
    F2Horno2CorrienteComponent,
    F2SiloCoheteComponent,
    F2SiloNorteComponent,
    F2SiloSurComponent,
    F2SiloCoheteBarraComponent,
    F2SiloNorteBarraComponent,
    F2SiloSurBarraComponent,
    F2Horno1CorrienteComponent,
    F2Horno1EnergiaComponent,
    F2Horno1PotenciaComponent,
    F2Horno1VoltageComponent,
    F2SiloCoheteCSComponent,
    F2SiloSurCSComponent,
    F2SiloNorteCSComponent,
    F2Horno1CSComponent,
    F2Horno2CSComponent,
    F2TtHorno1Component,
    F2TtHorno2Component,
    F2TtHorno1CsComponent,
    F2TtHorno2CsComponent,
    DescargaComponent,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    InfluxdbService,
    // { provide: DateAdapter, useClass: DateFnsAdapter },
    // { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
    // { provide: MAT_DATE_LOCALE, useValue: es}
  ]
})
export class SharedModule { }
