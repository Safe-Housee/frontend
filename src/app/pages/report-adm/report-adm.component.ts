import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IReporte } from 'src/app/interfaces/IReporte';
import { ReportService } from 'src/app/services/report/report.service';
import { UsuarioServiceService } from 'src/app/services/usuario/usuario-service.service';

@Component({
  selector: 'app-report-adm',
  templateUrl: './report-adm.component.html',
  styleUrls: ['./report-adm.component.css']
})
export class ReportAdmComponent implements OnInit {
  cdReporte: number;
  reporte: IReporte
  reportado: any;
  reportador: any;

  constructor(
    private route: ActivatedRoute, 
    private reportService: ReportService, 
    private userService: UsuarioServiceService
  ) { }

  ngOnInit(): void {
    this.cdReporte = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.reportService.getReport(this.cdReporte).subscribe((res: any) => {
      this.reporte = res;
      this.reportado = res.reportado[0];
      this.reportador = res.reportador[0];
      console.log(res)
    });
  }

  async getUserInfo(id: number): Promise<any> {
    const user = await this.userService.getUsuario(id).pipe().toPromise();
    return user;
  }

}
