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
    this.usuarioService.login(payload).subscribe(res => {
      sessionStorage.setItem('token', String(res.token)) ;
      sessionStorage.setItem('cdUsuario', res.cdUsuario);

      this.usuarioService.getUsuario(res.cdUsuario).subscribe(res => {
        sessionStorage.setItem('nmUsuario', res.nm_usuario);
        this.openSnackBar('Logado com sucesso', 'Ir para o inicio');
        this.router.navigate(['/main']);
      });
    }, (err) => {
      console.log(err);
      this.openSnackBar('Erro ao logar, tente novamente', 'Ir para o inicio');
    });
  }

  openSnackBar(message: string, action = null) {
    this._snackBar.open(message, action, {
      duration: 1000
    });
  }
}
