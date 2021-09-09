import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IJogador } from 'src/app/interfaces/IJogador';
import { HonraService } from 'src/app/services/honra/honra.service';
import { partida, usuario } from 'src/app/utils/storage';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  jogadores: Array<IJogador>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public honraService: HonraService,
    private dialog: MatDialogRef<VoteComponent>,
    private _snackBar: MatSnackBar,
    private route: Router
  ) { 
    const cdUsuario = usuario.getUsuario();
    const jogadores = data.jogadores.filter(jogador => jogador.cd_usuario !== Number(cdUsuario));
    this.jogadores = jogadores;
  }

  ngOnInit(): void {
  }

  atualizarHonra(avalicao: string): void {
    const cdPartida = partida.getPartida();
    const cdUsuario = usuario.getUsuario();
    this.honraService.avaliar(Number(cdPartida), Number(cdUsuario), avalicao).subscribe(res => {
      this.close();
      this.openSnackBar('Usuário avaliado com sucesso');
      this.route.navigate(['/']);
      partida.removerPartida();
    },
    (err) => {
      this.openSnackBar('Erro ao avaliar usuário, por favor entre em contato conosco');
      console.error(err);
      partida.removerPartida();
      this.route.navigate(['/']);
    });
  }

  close(): void {
    this.dialog.close();
  }

  openSnackBar(message: string, action = null): void {
    this._snackBar.open(message, action, {
      duration: 1000,
    });
  }

}
