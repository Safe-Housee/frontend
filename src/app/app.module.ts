import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './body/body.component';
import { ReportComponent } from './pages/report/report.component';
import { LayoutComponent } from './layout/layout.component';
import { MainComponent } from './main/main.component';
import { DoacaoComponent } from './pages/doacao/doacao.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { SalaComponent } from './pages/sala/sala.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    ReportComponent,
    LayoutComponent,
    MainComponent,
    DoacaoComponent,
    PerfilComponent,
    SalaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
