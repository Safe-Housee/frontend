import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalasService } from 'src/app/services/salas/salas.service';
import { partida } from 'src/app/utils/storage';

@Component({
  selector: 'app-salasdeespera',
  templateUrl: './salasdeespera.component.html',
  styleUrls: ['./salasdeespera.component.css']
})
export class SalasdeesperaComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private salaService: SalasService, 
    private router: Router) { }

  partida: any;
  cdPartida: number;

  ngOnInit(): void {
    this.cdPartida = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.loadPartida(this.cdPartida);
  }

  loadPartida(cdPartida: number) {
    this.salaService.partidaPorId(cdPartida).subscribe(res => {
      this.partida = res;
    });
  }

  back() {
    this.router.navigate(['/sala']);
  }

  exit() {
    this.salaService.sairDaPartida(this.cdPartida ,localStorage['cdUsuario']).subscribe(
      () => {
        partida.removerPartida();
        this.back();
      },
      (error) => console.log(error));
  }
    

}
