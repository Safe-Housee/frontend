import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendConfigService {

  constructor() { }

  private static _data = {
    backend: {
      dev: 'http://localhost:3333',
      prd: 'https://safehouse-api-fatec.herokuapp.com',
    },
  };

  private static backendUrl() {
    return this._data.backend.prd;
  }

  public static token() {
    return 'eyJhbGciOiJIUzI1NiJ9.MjM3.Rt13VkXeGkkNM1OMCtpKHhz85DWPAEumD03dDoiY2po';
  }

  public static httpOptions(image: boolean = false) {
    if(image) {
      return {
        headers: new HttpHeaders({
          Authorization: BackendConfigService.token(),
        }),
      };
    } else {    
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: BackendConfigService.token(),
        }),
      };
    }
  }

  public static handleError = (error: any) => {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  };

  public static criarUsuario() {
    return `${this.backendUrl()}/usuarios`;
  }

  public static login() {
    return `${this.backendUrl()}/login`;
  }

  public static partidas() {
    return `${this.backendUrl()}/partidas`;
  }

  public static partidasPorFiltro(gameId: number, empty: boolean) {
    let url = `${this.backendUrl()}/partidas?`;

    if (gameId) {
      url += `gameId=${gameId}`;
    }
    if (empty) {
      url += `empty=true`;
    }

    return url;
  }

  public static partidasNome(nmPartida: string) {
    return `${this.backendUrl()}/partidas?name=${nmPartida}`;
  }

  public static partidasPorId(cdPartida: number) {
    return `${this.backendUrl()}/partidas/${cdPartida}`;
  }

  public static reportes() {
    return `${this.backendUrl()}/reporte`;
  }

  public static getUsuario(cdUsuario: string | number) {
    return `${this.backendUrl()}/usuarios/${cdUsuario}`;
  }

  public static uploadImage(context: string, id: string | number) {
    return `${this.backendUrl()}/uploadImage?context=${context}&id=${id}`;
  }

  public static sairPartida(cdPartida: number, cdUsuario: number) {
    return `${this.partidasPorId(cdPartida)}/usuario/${cdUsuario}/exit`;
  }
}
