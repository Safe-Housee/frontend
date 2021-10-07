import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioServiceService } from 'src/app/services/usuario/usuario-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: any;
  hide = true;
  constructor(private usuarioService: UsuarioServiceService, private _snackBar: MatSnackBar, private router: Router) { 
    
  }

  ngOnInit(): void {
    this.login = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      senha: new FormControl(null, [Validators.required])
    });
    
  }

  submit() {
    const payload = {
      email: this.login.value.email,
      senha: this.login.value.senha
    }
    this.usuarioService.login(payload).subscribe(resLogin => {
      sessionStorage.setItem('token', String(resLogin.token)) ;
      this.usuarioService.getUsuario(resLogin.cdUsuario).subscribe(res => {
        sessionStorage.setItem('cdUsuario', resLogin.cdUsuario);
        sessionStorage.setItem('email', res.ds_email);
        sessionStorage.setItem('nmUsuario', res.nm_usuario);
        this.openSnackBar('Logado com sucesso', 'Ir para o inicio');
        this.router.navigate(['/main']);
      },
      (errGetUser) => {
        console.error(errGetUser)
        if(errGetUser.error.message === 'Você está bloqueado, espere até que seje desbloqueado') {
          this.router.navigate(['/block']);
        }
      });
    }, (err) => {
      console.error(err);
      this.openSnackBar('Erro ao logar, tente novamente', 'Ir para o inicio');
    });
  }

  openSnackBar(message: string, action = null) {
    this._snackBar.open(message, action, {
      duration: 1000
    });
  }
}
