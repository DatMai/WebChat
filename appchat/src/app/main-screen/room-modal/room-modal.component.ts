import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { WebSocketService } from 'src/app/service/web-socket.service';

@Component({
  selector: 'app-room-modal',
  templateUrl: './room-modal.component.html',
  styleUrls: ['./room-modal.component.css'],
})
export class RoomModalComponent implements OnInit {
  roomName: string = '';
  message: string = '';
  alert: string = '';
  constructor(
    private dataService: DataService,
    private wss: WebSocketService
  ) {}

  ngOnInit(): void {
    this.dataService.message$.subscribe((value) => (this.message = value));
    this.dataService.alert$.subscribe((value) => (this.alert = value));
  }
  public createRoomChat() {
    this.wss.createRoomChat(this.roomName);
  }
  public joinRoomChat() {
    this.wss.joinRoomChat(this.roomName) ;
    // this.getLastTime();
  }
  public clear() {
    this.roomName = '';
    this.message = '';
  }
  // public getLastTime() {
  //   // let messages = this.chatService.getLastMessage(chatContent);
  //   let mes = this.roomName.split(' ');
  //   let today = new Date(mes[0]);
  //   let thatday = new Date(mes[1]);
  //   var dayOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  //   //xét trường hợp năm nhuận
  //   if (today.getFullYear() % 400 == 0) {
  //     dayOfMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  //   } else {
  //     if (today.getFullYear() % 4 == 0) {
  //       dayOfMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  //     }
  //   }
  //   let rs: string = '';
  //   //chuyển ngày tháng năm giờ phút sang giây
  //   let distanceYear = today.getFullYear() - thatday.getFullYear();
  //   if (distanceYear <= 1) {
  //     let distanceMonth =
  //       distanceYear * 12 + today.getMonth() - thatday.getMonth();
  //     let distanceDate = today.getDate() - thatday.getDate();
  //     if (distanceMonth > 12) {
  //       rs = '1 năm';
  //     } else if (distanceMonth == 12) {
  //       if (distanceDate >= 0) {
  //         rs = '1 năm';
  //       } else {
  //         rs = '11 tháng';
  //       }
  //     } else {
  //       if (distanceMonth > 1) {
  //         if (distanceDate >= 0) {
  //           rs = distanceMonth + ' tháng';
  //         } else {
  //           rs = distanceMonth - 1 + ' tháng';
  //         }
  //       } else if (distanceMonth == 1) {
  //         if (distanceDate >= 0) {
  //           rs = '1 tháng';
  //         } else {
  //           rs = dayOfMonth[thatday.getMonth()] + distanceDate + 'ngày';
  //         }
  //       } else {
  //         let second =
  //           today.getDate() * 24 * 60 * 60 +
  //           today.getHours() * 60 * 60 +
  //           today.getMinutes() * 60 -
  //           (thatday.getDate() * 24 * 60 * 60 +
  //           thatday.getHours() * 60 * 60 +
  //           thatday.getMinutes() * 60);
  //           let minutes = second/60>0?(second-second%60)/60:1;
  //           let hours =(minutes-minutes%60)/60;
  //           let days = (hours-hours%24)/24;
  //           if(days>0) return rs = days + 'ngày';
  //           if(hours>0) return rs = hours + 'giờ';
  //           if(minutes>0) return rs = minutes + 'phút';
  //         }
  //     }
  //   } else rs = distanceYear + ' năm';
  //   return rs;
  // }
}
