import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { MainComponent } from './main/main.component';
import { ReportComponent } from './pages/report/report.component';
import { DoacaoComponent } from './pages/doacao/doacao.component';
import { SalaComponent } from './pages/sala/sala.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full'},
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'main', component: MainComponent },
      { path: 'report', component: ReportComponent },
      { path: 'doacao', component: DoacaoComponent },
      { path: 'sala', component: SalaComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppRoutingModule { }
