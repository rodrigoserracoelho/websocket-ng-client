import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'not connected to websocket, click on the socket...';
  websocket: WebSocket | undefined;

  messages: string = "";

  constructor() {

  }

  connect(): void {
    this.websocket = new WebSocket("ws://localhost:8381/echo?client=xpto"); 
    this.websocket.onopen = (event: any) => {
      this.title = "connected to websocket via gateway";
      this.messages = "awaiting for messages from localhost:8381/echo...\n";
    }
    this.websocket.onmessage = (event: any) => {
      let message = JSON.parse(event.data);
      console.log(message);
      this.messages = this.messages + message.content + "(sender: " + message.sender + ", ID: " + message.uuid + ")" + "\n";
    }
 }
   
}
