import { ApplicationRef, Component, Input, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { events } from 'src/app/enums/events';
import { usuario } from 'src/app/utils/storage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() cdPartida: number;
  @Input() isOwner: boolean;
  message: string = '';
  allMessage = [];
  cdUsuario = usuario.getUsuario();
  name = usuario.getNmUsuario();
  constructor(private socket: Socket, private appRef: ApplicationRef) { 
    console.log(socket)
  }

  ngOnInit(): void {
    this.initialEvents();
  }

  initialEvents() {
    this.allEvents();
    if (this.isOwner) {
      this.createMatch();
    } else {
      this.enterMatch();
    }
  }

  createMatch() {
    this.socket.emit(events.NEW_MATCH, {
      cdPartida: this.cdPartida,
      cdDonoPartida: this.cdUsuario,
      name: this.name
    });
    console.log('partida criada')
  }

  enterMatch() {
    this.socket.emit(events.ENTER_MATCH, {
      cdPartida: this.cdPartida,
      cdUsuario: this.cdUsuario,
      name: this.name
    });
    console.log('entrou na partida');
  }

  newMessage() {
    this.socket.emit(events.NEW_MESSAGE, {
      cdPartida: this.cdPartida,
      cdUsuario: this.cdUsuario,
      message: this.message,
      nmUsuario: this.name
    });
    this.appRef.tick();
    this.message = '';
  }

  enterSend(event) {
    if (event.keyCode === 13) {
      this.socket.emit(events.NEW_MESSAGE, {
        cdPartida: this.cdPartida,
        cdUsuario: this.cdUsuario,
        message: this.message,
        nmUsuario: this.name
      });
      this.message = '';
    }

  }

  async allEvents() {
    this.socket.fromEvent<any>(events.USER_ALREADY_ON_MATCH).pipe((data: any) => {
      console.log(data);
      data.subscribe(res => console.log(res));
      console.log('fez tudo')
      return data
    });

    this.socket.fromEvent<any>(events.ENTER_MATCH).pipe((data: any) => {
      data.subscribe(res => console.log(res));
      console.log('entrou na partida', data)
      return data
    });

    this.socket.fromEvent<any>(events.NEW_MESSAGE).pipe((data: any) => {
      console.log(data)
      data.subscribe(res => {
        console.log(res)
        this.allMessage.push(res)
      });
      return data
    });
  }
}
