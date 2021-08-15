import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { ChatContent } from '../model/ChatContent';
import { GroupChat } from '../model/GroupChat';
import { UserModel } from '../model/userModel';
import groupChatData  from '../data/groupChat.json';
import { ChatService } from './chat.service';
import { EmojisModel } from '../model/emojisModel';
import userData  from '../data/userData.json';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class DataService implements OnInit  {
  private searchSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  search$: Observable<string> = this.searchSubject.asObservable();
  private searchMessageSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  searchMessage$: Observable<string> = this.searchMessageSubject.asObservable();
  USERLOGIN :UserModel={};
  userIsChecking :UserModel={};
  selectedEmoji$ = new BehaviorSubject<EmojisModel>({});
  checkUserList$=new BehaviorSubject<boolean>(false);
  selectedChatContent$=new BehaviorSubject<ChatContent>({});
  chatContent$=new BehaviorSubject<ChatContent[]>([]);
  message$= new BehaviorSubject<string>("");
  alert$= new BehaviorSubject<string>("");
  chatContentExample: ChatContent[]=[];
  selectedChatContent: ChatContent = {};
  searchKeyWord: string[] = [];
  isShowListFriend:boolean=false;
  isShowListChatBox:boolean=true;
  isShowSetting: boolean = false;
  isShowSearch: boolean = false;
  isShowManager: boolean = false;
  isShowSearchMessage: boolean = false;
  isDarkMode: boolean = false;
  chatContentUserName:string='';
  userList  :UserModel[]=userData;
  constructor(private http:HttpClient) {

  }

  ngOnInit(): void {
  }


  setSearchKeywordMessage(text: string) {
    this.searchMessageSubject.next(text);
  }
  setSearchKeyword(text: string) {
    this.searchSubject.next(text);
  }

  public clear(){
    this.isShowListFriend=false;
    this.isShowListChatBox=true;
    this.isShowSetting=false;
    this.USERLOGIN={};
    this.selectedChatContent={};
    this.chatContentExample=[];
    sessionStorage.clear();
  }
  public getChatContentExample() {
    return this.chatContentExample;
  }
  public getListUser() {
    return this.userList;
  }
  public getSelectedChatContent() {
    return this.selectedChatContent;
  }
  public getListFriends() {
    return this.USERLOGIN.friends;
  }
  public getUSERLOGIN() {
    return this.USERLOGIN;
  }


}

