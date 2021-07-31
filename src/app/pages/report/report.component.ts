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
  formData: FormData;

  constructor(
    private reportService: ReportService, 
    private _snackBar: MatSnackBar,
    private route: Router) { }

  ngOnInit(): void {
    this.criarReport = new FormGroup({
      nm_reportado: new FormControl(null, [Validators.required]),
      ds_reporte: new FormControl(null, [Validators.required]),
      nm_reportador: new FormControl(localStorage['nmUsuario']),
    });
  }

  submit() {
    this.reportService.criarReporte(this.criarReport.value).subscribe(
      (res) => {
        console.log(res)
        this.reportService.salvarImagem('report', res.cd_reporte, this.formData).subscribe(
        () => {}, 
        () => this.openSnackBar('Erro ao salvar as imagens. Tente novamente'));
        this.openSnackBar('Reporte enviado com sucesso!','Ok');
        setTimeout(() => {
          this.route.navigate(['/main']);
        }, 2000);
      }, 
      (err) => this.openSnackBar(err.error.message,'Ok'));
  }

  openSnackBar(message: string, action = null) {
    console.log(message)
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      const file: File = fileList[0];
      this.formData = new FormData();
      this.formData.append('file', file, file.name);
    }
  }
}
