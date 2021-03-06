import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { UserModel } from 'src/app/model/userModel';
import { ChatService } from 'src/app/service/chat.service';
import { DataService } from 'src/app/service/data.service';
import { ChatContent } from '../../../model/ChatContent';
import { stringify } from 'querystring';
import { GifService } from 'src/app/service/gif.service';
import { animate, style, transition, trigger } from '@angular/animations';

declare var $: any;
@Component({
  selector: 'app-right-content',
  templateUrl: './right-content.component.html',
  styleUrls: ['./right-content.component.scss'],
  animations: [
    trigger('messagesAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-30px)' }),
        animate('0.3s', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class RightContentComponent implements OnInit, OnChanges, AfterViewInit {
  background: string = 'black';
  isDarkMode: boolean = true;
  USERLOGIN: UserModel = {};
  arrayKeyWord: string[] = [];
  index: number = 0;
  keyWord: string = '';
  constructor(
    private dataService: DataService,
    private chatService: ChatService,
    private gifService: GifService
  ) {}

  ngAfterViewInit(): void {
    this.addCss();
  }
  ngOnChanges(changes: SimpleChanges): void {}
  ngOnInit(): void {
    // this.USERLOGIN=JSON.parse(sessionStorage.USERLOGIN);
    console.log('ready UI');
    this.dataService.searchMessage$.subscribe((text) => (this.keyWord = text));
  }
  public darkMode() {
    return this.dataService.isDarkMode;
  }
  public getId(id: any, highlight: boolean): string {
    let getTextId = 'text' + id;
    let element = document.getElementsByClassName('highlight');
    if (highlight) {
      if (element.length != this.dataService.searchKeyWord.length) {
        this.dataService.searchKeyWord.push(getTextId);
      }
    }
    // console.log(this.dataService.searchKeyWord);
    return getTextId;
  }
  public isShowSearchMessage() {
    return this.dataService.isShowSearchMessage;
  }
  public close() {
    this.dataService.isShowSearchMessage = false;
    this.dataService.selectedChatContent.messages?.forEach((f) => {
      f.highlight = false;
    });
  }
  public getResultSearchMessageCount(): any {
    let count = 0;
    count = this.chatService.searchMessage(this.keyWord).length;
    return count;
  }
  public findUp() {
    this.dataService.searchKeyWord.sort();
    this.dataService.searchKeyWord.reverse();
    if (this.index < this.dataService.searchKeyWord.length) {
      document
        .getElementById(this.dataService.searchKeyWord[this.index++])
        ?.scrollIntoView();
    }
    console.log(this.index);
  }
  public findDown() {
    this.dataService.searchKeyWord.sort();
    this.dataService.searchKeyWord.reverse();
    if (this.index >= 0) {
      document
        .getElementById(this.dataService.searchKeyWord[this.index--])
        ?.scrollIntoView();
    }
    console.log(this.index);
  }
  public getSelectedChatContent() {
    return this.dataService.getSelectedChatContent();
  }

  public goToBottom() {
    let bottomPoint = document.getElementById('chatContent') || document.body;
    bottomPoint.scrollTo(0, bottomPoint.scrollHeight);
  }

  public typeOfMes(index: number): string {
    let chatContent: ChatContent = this.getSelectedChatContent();
    let listMessages: any = chatContent.messages;
    try {
      if (index == 0) {
        if (
          JSON.stringify(listMessages[index].userName) ==
          JSON.stringify(listMessages[index + 1].userName)
        ) {
          return 'begin';
        }
      }
      if (index == listMessages.length - 1) {
        if (
          JSON.stringify(listMessages[index].userName) ==
          JSON.stringify(listMessages[index - 1].userName)
        ) {
          return 'end';
        }
      }
      if (
        JSON.stringify(listMessages[index].userName) !=
        JSON.stringify(listMessages[index - 1].userName)
      ) {
        if (
          JSON.stringify(listMessages[index].userName) ==
          JSON.stringify(listMessages[index + 1].userName)
        ) {
          return 'begin';
        }
      }
      if (
        JSON.stringify(listMessages[index].userName) !=
        JSON.stringify(listMessages[index + 1].userName)
      ) {
        if (
          JSON.stringify(listMessages[index].userName) ==
          JSON.stringify(listMessages[index - 1].userName)
        ) {
          return 'end';
        }
      }
      if (
        JSON.stringify(listMessages[index].userName) ==
        JSON.stringify(listMessages[index + 1].userName)
      ) {
        if (
          JSON.stringify(listMessages[index].userName) ==
          JSON.stringify(listMessages[index - 1].userName)
        ) {
          return 'between';
        }
      }
    } catch (e) {}
    return 'single';
  }

  public isShowName(index: number) {
    if (this.typeOfMes(index) == 'begin' || this.typeOfMes(index) == 'single') {
      return true;
    }
    return false;
  }
  public isShowAvatar(index: number) {
    if (this.typeOfMes(index) == 'end' || this.typeOfMes(index) == 'single') {
      return true;
    }
    return false;
  }
  public addCss() {
    // let parent = document.querySelectorAll(".begin");
    // let partner__text = document.querySelector("/p")
  }
  public getDate(time: string) {
    // console.log(time);
    let rs: string = '';
    let thatday = new Date(time);
    let today = new Date();
    let timers: string = '';

    timers +=
      thatday.getHours() +
      ':' +
      (thatday.getUTCMinutes() >= 10
        ? thatday.getUTCMinutes()
        : '0' + thatday.getUTCMinutes());
    //Th???i gian xa ,?????nh d???ng mm/dd/yyyy hh:mm
    rs = thatday.toLocaleDateString() + ' ' + timers;

    //s??? ng??y trong m???i th??ng
    var dayOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    //x??t tr?????ng h???p n??m nhu???n
    if (today.getFullYear() % 400 == 0) {
      dayOfMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    } else {
      if (today.getFullYear() % 4 == 0) {
        dayOfMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      }
    }

    //Th???i gian g???n (trong 1 tu???n) , ?????nh d???ng : Th??? .. gi???:ph??t
    var days = [
      'Ch??? nh???t',
      'Th??? 2',
      'Th??? 3',
      'Th??? 4',
      'Th??? 5',
      'Th??? 6',
      'Th??? 7',
    ];

    if (thatday.getFullYear() == today.getFullYear()) {
      //c??ng tu???n c??ng th??ng
      if (thatday.getMonth() == today.getMonth()) {
        if (today.getDate() == thatday.getDate()) {
          rs = timers;
        } else if (today.getDate() - thatday.getDate() < 7) {
          rs = days[thatday.getDay()] + ' ' + timers;
        }
      }
      //c??ng tu???n kh??c th??ng
      if (today.getMonth() - thatday.getMonth() == 1) {
        let todayDate = dayOfMonth[thatday.getMonth()] + today.getDate();
        if (todayDate - thatday.getDate() < 7) {
          rs = days[thatday.getDay()] + ' ' + timers;
        }
      }
    }
    return rs;
  }

  public isGif(message: string) {
    return this.gifService.isGif(message);
  }
  public isNofication(messages: any) {
    return this.chatService.isNofication(messages);
  }
  public isMes(messages: any) {
    return this.chatService.isMes(messages);
  }
}
