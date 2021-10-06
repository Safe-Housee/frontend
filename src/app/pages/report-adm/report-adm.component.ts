import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { IReporte } from 'src/app/interfaces/IReporte';
import { ReportService } from 'src/app/services/report/report.service';
import { UsuarioServiceService } from 'src/app/services/usuario/usuario-service.service';
import { HonraService } from 'src/app/services/honra/honra.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { statusReporte } from 'src/app/enums/statusReport';
import Viewer from 'viewerjs';
import { MatDialog } from '@angular/material/dialog';
import { ImageViewerComponent } from 'src/app/components/image-viewer/image-viewer.component';

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
    private userService: UsuarioServiceService,
    private _sanitizer: DomSanitizer,
    private honraService: HonraService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.cdReporte = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.getReportInfo(this.cdReporte);
  }

  async getUserInfo(id: number): Promise<any> {
    const user = await this.userService.getUsuario(id).pipe().toPromise();
    return user;
  }

  getReportInfo(cdReporte: number): void {
    this.reportService.getReport(cdReporte).subscribe((res: any) => {
      this.reporte = res;
      this.reportado = res.reportado[0];
      this.reportador = res.reportador[0];
      console.log(res)
    });
  }

  base64ToImage(buffer: string): any {
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + buffer);
  }

  status(status: string): string {
    switch(status) {
      case 'pendente':
        return 'Pendente';
      default:
        return ''
    }
  }

  updateHonra(cdUsuario: number, avaliacao: string) {
    this.honraService.avaliarUsuario(cdUsuario, avaliacao).subscribe(res => {
      this.openSnackBar('Usuário avaliado com sucesso');
      console.log(res)
    },
    (err) => {
      this.openSnackBar('Erro ao atualiza a honra do usuário, por favor entre em contato conosco');
      console.error(err);
    });
  }

  openSnackBar(message: string, action?: string): void {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }

  updateBlockStatus(): void {
    this.honraService.updateBlock(this.reportado.cd_usuario).subscribe(
      () => {
        this.openSnackBar('Status atualizado!');
        this.getReportInfo(this.cdReporte);
      }, 
      (error) => {
        console.error(error);
      }
    );
  }

  alterarStatus() {
    let status: string;
    if (this.reporte.ds_statusReporte === statusReporte.PENDENTE) {
      status = statusReporte.FINALIZADO
    } else {
      status = statusReporte.PENDENTE
    }
    this.reportService.atualizarReporte(this.cdReporte, status).subscribe(
      () => {
        this.openSnackBar('Reporte atualizado');
        this.getReportInfo(this.cdReporte);
      },
      (error) => {
        console.error(error);
      }
    )
  }

  setFullPageImage(image) {
    this.dialog.open(ImageViewerComponent, {
      data: image
    })
  }
}
