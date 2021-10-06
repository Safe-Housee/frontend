import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { ReportService } from 'src/app/services/report/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  criarReport: any;
  formData: Array<FormData> = [];
  haveFile: boolean = false;

  constructor(
    private reportService: ReportService,
    private _snackBar: MatSnackBar,
    private route: Router) { }

  ngOnInit(): void {
    this.criarReport = new FormGroup({
      nm_reportado: new FormControl(null, [Validators.required]),
      ds_reporte: new FormControl(null, [Validators.required]),
      nm_reportador: new FormControl(sessionStorage['nmUsuario']),
    });
  }

  submit() {
    this.reportService.criarReporte(this.criarReport.value).subscribe(
      async (res) => {
        if(this.haveFile) {
          const filesPromise = [];
          this.formData.forEach(file => {
            filesPromise.push(
              this.reportService.salvarImagem('report', res.cd_reporte, file).pipe().toPromise()
              .then(() => this.openSnackBar('Imagens salvas.'))
              .catch(() => this.openSnackBar('Erro ao salvar as imagens. Tente novamente'))
            );
          });
          Promise.all(filesPromise);
          // this.reportService.salvarImagem('report', res.cd_reporte, this.formData).subscribe(
          //   () => this.openSnackBar('Imagens salvas.'),
          //   () => this.openSnackBar('Erro ao salvar as imagens. Tente novamente'));
        }
        this.openSnackBar('Reporte enviado com sucesso!', 'Ok');
        setTimeout(() => {
          this.route.navigate(['/main']);
        }, 1000);
      },
      (err) => this.openSnackBar(err.error.message, 'Ok'));
  }

  openSnackBar(message: string, action = null) {
    this._snackBar.open(message, action, {
      duration: 1000,
    });
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    console.log(fileList)
    if (fileList.length > 0) {
      this.haveFile = true;
      for (let index = 0; index < fileList.length; index++) {
        const file = fileList.item(index);
        console.log(file)
        this.formData[index] = new FormData();
        this.formData[index].append('file', file, file.name);
      }

    }
  }
}
