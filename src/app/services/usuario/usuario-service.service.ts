import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BackendConfigService } from '../config/backend-config.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  constructor(private http: HttpClient) { }

  criarUsuario(usuarioInfo: any): Observable<any> { 
    return this.http.post(BackendConfigService.criarUsuario(), usuarioInfo, BackendConfigService.httpOptions())
      .pipe(catchError(BackendConfigService.handleError));
    
  }
}
