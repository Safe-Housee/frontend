import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { MainComponent } from './pages/main/main.component';
import { ReportComponent } from './pages/report/report.component';
import { DoacaoComponent } from './pages/doacao/doacao.component';
import { SalaComponent } from './pages/sala/sala.component';
import { SalasdeesperaComponent } from './pages/salasdeespera/salasdeespera.component';
import { CadastrarUsuarioComponent } from './pages/cadastrar-usuario/cadastrar-usuario.component';
import { AuthGuard } from './services/auth/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { AcademyComponent } from './pages/academy/academy.component';
import { ReportAdmListComponent } from './pages/report-adm-list/report-adm-list.component';
import { ReportAdmComponent } from './pages/report-adm/report-adm.component';
import { BlockWarningComponent } from './pages/block-warning/block-warning.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full'},
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'main', component: MainComponent },
      { path: 'cadastro', component: CadastrarUsuarioComponent },
      { path: 'login', component: LoginComponent },
      { path: 'doacao', component: DoacaoComponent },
      { path: 'block', component: BlockWarningComponent },
      { path: 'report', component: ReportComponent, canActivate: [AuthGuard] },
      { path: 'sala', component: SalaComponent, canActivate: [AuthGuard] },
      { path: 'salasdeespera/:id', component: SalasdeesperaComponent, canActivate: [AuthGuard] },
      { path: 'reportList', component: ReportAdmListComponent, canActivate: [AuthGuard] },
      { path: 'reportAdm/:id', component: ReportAdmComponent, canActivate: [AuthGuard] },
      { path: 'academy', component: AcademyComponent, canActivate: [AuthGuard] }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppRoutingModule { }
