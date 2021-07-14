import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendConfigService } from '../config/backend-config.service';

@Injectable({
  providedIn: 'root'
})
export class SalasService {

  constructor(private http: HttpClient) { }

  getSalas(): Observable<any> {
    return this.http.get(BackendConfigService.partidas(), BackendConfigService.httpOptions());
  }

  criarPartida(payload: any): Observable<any> {
    return this.http.post(BackendConfigService.partidas(), payload, BackendConfigService.httpOptions());
  }
}
