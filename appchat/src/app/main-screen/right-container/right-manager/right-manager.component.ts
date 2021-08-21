import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/service/data.service';
import {animate, keyframes, query, stagger, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-right-manager',
  templateUrl: './right-manager.component.html',
  styleUrls: ['./right-manager.component.scss'],
  // animations: [
  //   trigger('listAnimation',[
  //     state('hide',style({
  //       opacity:0,
  //       transform:"translateX(30px)",
  //       height:"0px"
  //
  //     })),
  //     transition('hide => show',[
  //       animate('0.3s',style({
  //         opacity:1,
  //         transform:"translateX(0px)",
  //         height:"fit-content",
  //       }))
  //     ]),
  //     transition('show => hide',[
  //       animate('0.3s',style({
  //         opacity:0,
  //         transform:"translateX(30px)",
  //         height:"0px",
  //       }))
  //     ])
  //   ])
  // ]
  animations:[
    trigger("listAnimation",[

      transition(':enter',[
        query('.list__item', style({opacity:0}),{optional:true}),
        query('.list__item', stagger('50ms',[
          animate('0.3s', keyframes([
            style({opacity:0, transform: "translateX(75px)",offset: 0}),
            style({opacity:1, transform: "translateX(0px)",offset: 1}),
          ]))
        ]),{optional:true})
      ]),
      transition(':leave',[
        query('.list__item', style({opacity:1}),{optional:true}),
        query('.list__item', stagger('50ms',[
          animate('0.3s', keyframes([
            style({opacity:1, transform: "translateX(0px)",offset: 0}),
            style({opacity:0, transform: "translateX(75px)",offset: 1}),
          ]))
        ]),{optional:true})
      ])
    ]),
    ],
})
export class RightManagerComponent implements OnInit {
  isShowChatSetting:boolean = false;
  isShowChatSharing:boolean = false;
  isShowChatPrivate: boolean = false;
  background: string = "222323";
  constructor(private dataService:DataService
    ) { }

  ngOnInit(): void {

  }
  public darkMode() {
    this.dataService.isDarkMode = !this.dataService.isDarkMode;
  }
  public getDarkMode() {
    return this.dataService.isDarkMode;
  }
 public listState(flag:boolean){
    return flag? 'show':'hide';
  }

  public isActive(bol :boolean){
    if(bol == true){
      return "active";
    }else{
      return "deactive";
    }
  }

  public clickEffect(){
  }

  public getSelectedChatContent() {
    return this.dataService.getSelectedChatContent();
  }
  public isShowUserList() {
    return this.getSelectedChatContent().isGroup;
  }

  public showChatSetting(){
    this.isShowChatSetting = !this.isShowChatSetting
  }
  public showChatSharing(){
    this.isShowChatSharing = !this.isShowChatSharing
  }
  public showChatPrivate(){
    this.isShowChatPrivate = !this.isShowChatPrivate
  }

}
