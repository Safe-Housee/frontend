import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SalasService } from 'src/app/services/salas/salas.service';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent implements OnInit {
  partidas: any = [];
  partidaForm: any;
  constructor(private partidasService: SalasService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadPartidas();
    this.iniciarFormulario();
  }

  loadPartidas(): void {
    this.partidasService.getSalas().subscribe(res => {
      this.partidas = res.partidas;
    });
  }

  iniciarFormulario(): void {
    this.partidaForm = new FormGroup({
      cd_jogo: new FormControl(null, [Validators.required]),
      nm_partida: new FormControl(null, [Validators.required]),
      cd_usuario: new FormControl(localStorage['cdUsuario'], [Validators.required]),
    });
  }

  submit(): void {
    console.log(this.partidaForm.value);
    const date = new Date();
    const payload = {
      dt_partida: `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`,
      hr_partida: `${date.getHours()}:${date.getMinutes()}`,
      ...this.partidaForm.value
    }
    this.partidasService.criarPartida(payload).subscribe(() => {
      this.openSnackBar('Sala criada com sucesso!');
      this.loadPartidas();
    }, (err) => {
      console.log(err)
      this.openSnackBar('Erro ao criar a sala...');
    });
  }

  openSnackBar(message: string, action = null) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }

}
