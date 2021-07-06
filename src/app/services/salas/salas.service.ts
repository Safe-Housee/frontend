import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BackendConfigService } from '../config/backend-config.service';
interface Sala {
  cd_jogo: string | number,
  nm_partida: string,
  cd_usuario: string | number,
  dt_partida: string,
  hr_partida: string,
}
@Injectable({
  providedIn: 'root'
})
export class SalasService {

  constructor(private http: HttpClient) { }

  getSalas() {
    return this.http.get(BackendConfigService.partidasPorJogo(), BackendConfigService.httpOptions())
    .pipe(catchError(BackendConfigService.handleError));
  }

  criarSala(payload: Sala) {
    return this.http.post(BackendConfigService.partidas(),payload ,BackendConfigService.httpOptions())
    .pipe(catchError(BackendConfigService.handleError));
  }
}
