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
      stg: '',
      prod: '',
    },
  };

  private static backendUrl() {
    return this._data.backend.dev;
  }

  public static token() {
    return 'eyJhbGciOiJIUzI1NiJ9.MjM3.Rt13VkXeGkkNM1OMCtpKHhz85DWPAEumD03dDoiY2po';
  }

  public static httpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: BackendConfigService.token(),
      }),
    };
  }
}
