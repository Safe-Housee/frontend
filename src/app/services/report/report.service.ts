import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendConfigService } from '../config/backend-config.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  criarReporte(payload: any): Observable<any> {
    return this.http.post(BackendConfigService.reportes(), payload, BackendConfigService.httpOptions());
  }
}
