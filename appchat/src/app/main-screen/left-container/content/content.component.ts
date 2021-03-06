import { Component, OnInit } from '@angular/core';
import { ChatContent } from 'src/app/model/ChatContent';
import { GroupChat } from 'src/app/model/GroupChat';
import { UserModel } from 'src/app/model/userModel';
import { ChatService } from 'src/app/service/chat.service';
import { DataService } from 'src/app/service/data.service';
import { GifService } from 'src/app/service/gif.service';
import { UserService } from 'src/app/service/user.service';
import { WebSocketService } from 'src/app/service/web-socket.service';
import {animate, keyframes, query, stagger, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  animations: [
    trigger("listAnimation",[
      transition('* => *',[
        query(':enter', style({opacity:0}),{optional:true}),
        query(':enter', stagger('50ms',[
          animate('0.3s', keyframes([
            style({opacity:0, transform: "translateX(-75px)",offset: 0}),
            style({opacity:1, transform: "translateX(0px)",offset: 1}),
          ]))
        ]),{optional:true})
      ])
    ])
  ],
})
export class ContentComponent implements OnInit {
  USERLOGIN: UserModel = {};
  checkSearch: boolean = false;
  name: string = '';
  constructor(
    private dataService: DataService,
    private userService: UserService,
    private wss: WebSocketService,
    private chatService: ChatService,
    private gifService: GifService
  ) {}

  ngOnInit(): void {
    this.dataService.search$.subscribe((text) => (this.name = text));
    this.USERLOGIN = JSON.parse(sessionStorage.USERLOGIN);
  }
  public logout() {
    this.wss.logout();
  }
  public getListSearch() {
    return this.userService.search(this.name);
  }
  public isCheckSearch() {
    return this.name.length != 0;
  }
  public isShowSearch() {
    return this.dataService.isShowSearch;
  }
  public checkUser(user: UserModel) {
    return this.wss.checkUser(user);
  }
  public isShowListChatBox() {
    return this.dataService.isShowListChatBox;
  }
  public isShowListFriend() {
    return this.dataService.isShowListFriend;
  }
  public isShowSetting() {
    return this.dataService.isShowSetting;
  }
  public getListUser() {
    return this.dataService.getListUser();
  }
  public getUSERLOGIN() {
    return this.dataService.USERLOGIN;
  }
  public getChatContentExample() {
    return this.dataService.getChatContentExample();
  }

  public setSelectedChatContent(chatContent: ChatContent) {
    // this.userService.getAudio();
    this.dataService.isShowSearchMessage = false;
    this.dataService.selectedChatContent.messages?.forEach(f => {
      f.highlight = false;
    })
    console.log(this.getLastTime(chatContent));

    this.chatService.setSelectedChatContent(chatContent);
  }
  public setSelectedChatContentByUserModel(usermodel: UserModel) {
    this.checkUser(usermodel);
    this.dataService.isShowSearchMessage = false;
    this.dataService.selectedChatContent.messages?.forEach(f => {
      f.highlight = false;
    })
    this.chatService.setSelectedChatContentByUserModel(usermodel);
  }

  public goToBottom() {
    let bottomPoint = document.getElementById('chatContent') || document.body;
    bottomPoint.scrollTo(0, bottomPoint.scrollHeight);
  }

  public getStringLastMessage(chatContent: ChatContent): string {
    let messages = this.chatService.getLastMessage(chatContent);
    let rs = messages;
    if (rs != 'Ch??a c?? tin nh???n m???i') {
      if (this.gifService.isGif(messages.message)) {
        if (messages.mine) {
          rs= 'B???n ???? g???i 1 gif';
        } else {
          rs = messages.userName + ' ???? g???i 1 gif';
        }
      }else{
          if (messages.mine) {
            rs = 'B???n: ' + messages.message;
          } else {
            if (chatContent.isGroup) {
              rs = messages.userName + ':' + messages.message;
            } else {
              rs = messages.message;
            }
          }
        }
      }
    return rs;
  }
  public getLastTime(chatContent: ChatContent) {
    let messages = this.chatService.getLastMessage(chatContent);
    // let mes = this.roomName.split(' ');
    let today = new Date();
    let thatday = new Date(messages.createAt);
    var dayOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    //x??t tr?????ng h???p n??m nhu???n
    if (today.getFullYear() % 400 == 0) {
      dayOfMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    } else {
      if (today.getFullYear() % 4 == 0) {
        dayOfMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      }
    }
    let rs: string = '';
    //chuy???n ng??y th??ng n??m gi??? ph??t sang gi??y
    let distanceYear = today.getFullYear() - thatday.getFullYear();
    if (distanceYear <= 1) {
      let distanceMonth =
        distanceYear * 12 + today.getMonth() - thatday.getMonth();
      let distanceDate = today.getDate() - thatday.getDate();
      if (distanceMonth > 12) {
        rs = '1 n??m';
      } else if (distanceMonth == 12) {
        if (distanceDate >= 0) {
          rs = '1 n??m';
        } else {
          rs = '11 th??ng';
        }
      } else {
        if (distanceMonth > 1) {
          if (distanceDate >= 0) {
            rs = distanceMonth + ' th??ng';
          } else {
            rs = distanceMonth - 1 + ' th??ng';
          }
        } else {
          if (distanceMonth==1) {
            if (distanceDate >= 0) {
              rs = distanceMonth + ' th??ng';
            } else {
              rs = dayOfMonth[today.getMonth()]+distanceDate + ' ng??y';
            }
          } else {
            let distanceHours = today.getHours() - thatday.getHours();
            if (distanceDate > 1) {
              if (distanceHours >= 0) {
                rs = distanceDate + ' ng??y';
              } else{
                rs = distanceDate-1 + ' ng??y';
              }
            }else{
              if (distanceDate==1) {
                if (distanceHours>=0) {
                  rs = '1 ng??y';
                } else {
                  rs = 24+distanceHours+' gi???';
                }
              }else{
                let distanceMinutes = today.getMinutes() - thatday.getMinutes();
                if (distanceHours > 1) {
                  if (distanceMinutes>=0) {
                    rs =distanceHours+' gi???';
                  }else{
                    rs =distanceHours-1+' gi???';
                  }
                }else{
                  if (distanceHours == 1) {
                    if (distanceMinutes>=0) {
                      rs ='1 gi???';
                    }else{
                      rs =60+distanceMinutes+' ph??t';
                    }
                  }else{
                    if (distanceMinutes>0) {
                      rs =distanceMinutes+' ph??t';
                    }else{
                      rs =1+' ph??t';
                    }
                  }
                }
              }
            }
          }

        }
      }
    } else {
      let distanceMonth = today.getMonth() - thatday.getMonth();
      if (distanceMonth > 0) {
        rs = distanceYear + ' n??m';
      } else if (distanceMonth == 0) {
        let distanceDate = today.getDate() - thatday.getDate();
        if (distanceDate >= 0) {
          rs = distanceYear + ' n??m';
        } else {
          rs = distanceYear - 1 + ' n??m';
        }
      } else rs = distanceYear - 1 + ' n??m';
    }
    return rs;
  }
}
