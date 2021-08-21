import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';
import {DataService} from "../../service/data.service";
import {animate, state, transition, trigger, style} from "@angular/animations";
import {inspect} from "util";

@Component({
  selector: 'app-right-container',
  templateUrl: './right-container.component.html',
  styleUrls: ['./right-container.component.scss'],
  animations:[
    trigger('rightManagerAnimation',[
      transition(':enter', [
        style({ width:"0%", opacity:0 }),
        animate('0.3s', style({ width:"30%"})),
        animate('0.4s', style({opacity:1})),
      ]),
      transition(':leave', [
        animate('0.3s', style({ opacity: 0 }))
      ])
    ]),
    trigger('leftSectionAnimation',[
     state('small',style({
       width:"70%"
     })),
      state('large',style({
        width:"100%"
      })),
      transition('small => large', animate('0.3s')),
      transition('large => small', animate('0.3s'))

    ])
  ]
})
export class RightContainerComponent implements OnInit {

  constructor(private chatService:ChatService, private dataService:DataService){ }

  ngOnInit(): void {
  }

  public isSelectedChatBox(){
    return this.chatService.isChatBoxSelected();
  }
  public isShowManager(){
    return this.dataService.isShowManager;
  }
  public leftSectionState(){
    return this.isShowManager()? "small" : "large";
  }


}
