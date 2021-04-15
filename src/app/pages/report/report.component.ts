import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  fileToUpload: File;
  reportForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.reportForm = new FormGroup({
      nm_reportado: new FormControl('', [Validators.required]),
      ds_reporte: new FormControl('', [Validators.required])
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  } 

  canSendReport() {
    return !this.reportForm.valid;
  }

  submit() {
    
  }

}
