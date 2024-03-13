import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { PagprincipalComponent } from './modules/pagprincipal/pagprincipal.component';

import { F2Horno2Component } from './modules/f2-horno2/f2-horno2.component';
import { F2Horno1Component } from './modules/f2-horno1/f2-horno1.component';
import { F2SilosComponent } from './modules/f2-silos/f2-silos.component';
import { F2TtermicosComponent } from './modules/f2-ttermicos/f2-ttermicos.component';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
    path: 'principal',
    component: PagprincipalComponent
  }, {
    path: 'f2-horno1',
    component: F2Horno1Component
  }, {
    path: 'f2-horno2',
    component: F2Horno2Component
  }, {
    path: 'f2-silos',
    component: F2SilosComponent
  }, {
    path: 'f2-ttermicos',
    component: F2TtermicosComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
