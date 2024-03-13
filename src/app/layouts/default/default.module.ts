import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { F2Horno1Component } from 'src/app/modules/f2-horno1/f2-horno1.component';
import { F2Horno2Component } from 'src/app/modules/f2-horno2/f2-horno2.component';
import { F2SilosComponent } from 'src/app/modules/f2-silos/f2-silos.component';
import { F2TtermicosComponent } from 'src/app/modules/f2-ttermicos/f2-ttermicos.component';
import { PagprincipalComponent } from 'src/app/modules/pagprincipal/pagprincipal.component';


@NgModule({
  declarations: [
    DefaultComponent,
    PagprincipalComponent,
    F2Horno1Component,
    F2Horno2Component,
    F2SilosComponent,
    F2TtermicosComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
  ]
})
export class DefaultModule { }
