import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserModel } from './model/userModel';
import { DataService } from './service/data.service';
import { WebSocketService } from './service/web-socket.service';
import { environment } from 'src/environments/environment';
import { GifService } from './service/gif.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private dataService:DataService,private gifService:GifService,private wss:WebSocketService ) {
  }
  ngOnInit(): void {
    this.wss.openWebsocket();
    this.gifService.getTrendingGifs().subscribe((respone:any) => {
      this.gifService.listGifs = respone.data;
    });
    this.dataService.chatContent$.subscribe(
      value=>this.dataService.chatContentExample=value
    )

    this.dataService.selectedChatContent$.subscribe(
      value=>this.dataService.selectedChatContent=value
    )
  }
  title = 'AppChat';
  USER :UserModel=  {};
}
