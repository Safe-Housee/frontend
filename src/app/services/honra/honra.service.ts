import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendConfigService } from '../config/backend-config.service';

@Injectable({
  providedIn: 'root'
})
export class HonraService {

  constructor(private http: HttpClient) { }

  avaliar(cdPartida: number, cdUsuario: number, avaliacao: string): Observable<any> {
      const body = {
          avaliacao: avaliacao
      }
    return this.http.post(BackendConfigService.avaliarUsuario(cdPartida, cdUsuario), body, BackendConfigService.httpOptions());
  }
}
