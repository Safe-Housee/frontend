import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private socket: Socket) { }

  ngOnInit(): void {
  }

  sendMessage(msg: string = 'teste') {
    try {
      this.socket.emit('connection', msg)
    } catch (err) {
      console.log(err)
    }

  }
  getMessage() {
    return this.socket.fromEvent('connection').pipe(map((data) => data));
  }
}
