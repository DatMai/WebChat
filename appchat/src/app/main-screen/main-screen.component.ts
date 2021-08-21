import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../service/chat.service';
import { DataService } from '../service/data.service';
import { UserService } from '../service/user.service';
import { WebSocketService } from '../service/web-socket.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent implements OnInit {

  constructor(private wss:WebSocketService,private dataService:DataService,private router:Router
              ) { }
  ngOnInit(): void {
    // if (sessionStorage.length==0) {
    //   this.router.navigateByUrl('login');
    // }
  }


}
