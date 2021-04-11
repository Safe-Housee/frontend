import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { MainComponent } from './main/main.component';
import { ReportComponent } from './report/report.component';
import { DoacaoComponent } from './doacao/doacao.component';
import { PerfilComponent } from './perfil/perfil.component';
import { SalaComponent } from './sala/sala.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full'},
  {
    path: '',
    component: LayoutComponent, 
    children: [
      { path: 'main', component: MainComponent },
      { path: 'report', component: ReportComponent },
      { path: 'doacao', component: DoacaoComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'sala', component: SalaComponent }
      


    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
