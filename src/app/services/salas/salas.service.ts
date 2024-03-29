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

  partidaPorId(cdPartida: number): Observable<any> {
    return this.http.get(BackendConfigService.partidasPorId(cdPartida), BackendConfigService.httpOptions());
  }

  partidasPorFiltro(gameId: number, empty: boolean): Observable<any> {
    return this.http.get(BackendConfigService.partidasPorFiltro(gameId, empty), BackendConfigService.httpOptions());
  }

  partidasPorNome(nmPartida: string): Observable<any> {
    return this.http.get(BackendConfigService.partidasNome(nmPartida), BackendConfigService.httpOptions());
  }

  sairDaPartida(cdPartida: number, cdUsuario: number): Observable<any> {
    return this.http.patch(BackendConfigService.sairPartida(cdPartida, cdUsuario), null, BackendConfigService.httpOptions());
  }

  entrarPartida(cdPartida: number, cdUsuario: number): Observable<any> {
    return this.http.patch(BackendConfigService.partidaUsuario(cdPartida, cdUsuario), null, BackendConfigService.httpOptions());
  }

  atualizarStatus(cdPartida: number, dsStatus: string): Observable<any> {
    return this.http.patch(BackendConfigService.updatePartidaStatus(cdPartida, dsStatus), null, BackendConfigService.httpOptions());
  }
}
