import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { MainComponent } from './main/main.component';
import { ReportComponent } from './pages/report/report.component';
import { DoacaoComponent } from './pages/doacao/doacao.component';
import { SalaComponent } from './pages/sala/sala.component';
import { SalasdeesperaComponent } from './pages/salasdeespera/salasdeespera.component';
import { CadastrarUsuarioComponent } from './pages/cadastrar-usuario/cadastrar-usuario.component';
import { Error404Component } from './pages/error404/error404.component';
import { AuthGuard } from './services/auth/auth.guard';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full'},
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'main', component: MainComponent },
      { path: 'report', component: ReportComponent, canActivate: [AuthGuard] },
      { path: 'doacao', component: DoacaoComponent },
      { path: 'sala', component: SalaComponent, canActivate: [AuthGuard] },
      { path: 'salasdeespera', component: SalasdeesperaComponent, canActivate: [AuthGuard] },
      { path: 'cadastro', component: CadastrarUsuarioComponent },
      { path: 'login', component: LoginComponent},

      {
        path: '**', component: Error404Component
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppRoutingModule { }
