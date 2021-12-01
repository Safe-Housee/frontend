import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IReporte } from 'src/app/interfaces/IReporte';
import { ReportService } from 'src/app/services/report/report.service';
import { UsuarioServiceService } from 'src/app/services/usuario/usuario-service.service';

@Component({
  selector: 'app-report-adm-list',
  templateUrl: './report-adm-list.component.html',
  styleUrls: ['./report-adm-list.component.css']
})
export class ReportAdmListComponent implements OnInit {
  reportes: Array<IReporte>
  loading = true;

  constructor(
    private reportService: ReportService, 
    private userService: UsuarioServiceService, 
    private route: Router
  ) { }

  ngOnInit(): void {
    this.reportService.listarReportes().subscribe(async (res: any) => {
      const tempArrayOfCompleteReport = [];
      for (const reporte of res.reportes) {
        const reportado = await this.getUserInfo(reporte.cd_reportado);
        const reportador = await this.getUserInfo(reporte.cd_reportador);
        const reporteInfo = {
          reportado, 
          reportador,
          ...reporte,
        }
        tempArrayOfCompleteReport.push(reporteInfo)
      }
      console.log(tempArrayOfCompleteReport)
      this.reportes = tempArrayOfCompleteReport;
      setTimeout(() => {
        this.loading = false;
      },1000)
    });
  }

  async getUserInfo(id: number): Promise<any> {
    const user = await this.userService.getUsuario(id).pipe().toPromise();
    return user;
  }

  goToReportPage(id: number): void {
    this.route.navigate([`reportAdm/${id}`]);
  }

}
