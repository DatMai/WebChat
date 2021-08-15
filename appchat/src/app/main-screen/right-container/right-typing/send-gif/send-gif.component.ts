import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';
import { GifService } from 'src/app/service/gif.service';
import {DataService} from "../../../../service/data.service";

@Component({
  selector: 'app-send-gif',
  templateUrl: './send-gif.component.html',
  styleUrls: ['./send-gif.component.scss']
})
export class SendGifComponent implements OnInit {
  gifs:any[] = [];

  constructor(  private gifService:GifService,private chatService:ChatService) { }

  ngOnInit(): void {

  }
  public getListGif(){
    return this.gifService.listGifs;
  }
  sendGif(url:string){
    this.chatService.sendTo(url);

  }
  searchGif(searchTerm:string){
    if(searchTerm !== ' '){
      this.gifService.searchGifs(searchTerm).subscribe((respone:any)=>{
        this.gifService.listGifs = respone.data;
      });
    }

  }

}
