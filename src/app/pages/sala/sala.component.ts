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
  criarPartida: any;
  constructor(private salaService: SalasService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.criarPartida = new FormGroup({
      cd_jogo: new FormControl(null, [Validators.required]),
      nm_partida: new FormControl(null, [Validators.required]),
      cd_usuario: new FormControl(localStorage['cdUsuario'], [Validators.required]),
    });
    this.salaService.getSalas().subscribe(res => console.log(res))
  }

  submit () {
    const date = new Date()
    const payload = {
      dt_partida: `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`,
      hr_partida: `${date.getHours()}:${date.getMinutes()}`,
      ...this.criarPartida.value
    }
    this.salaService.criarSala(payload).subscribe(() => {
      this.openSnackBar('Sala criada com sucesso!');
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
