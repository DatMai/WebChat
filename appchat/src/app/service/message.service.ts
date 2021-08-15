import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }
  public getLastTime(thatTime:string,thisTime: string) {
    // let mes = this.roomName.split(' ');
    let today = new Date(thisTime);
    let thatday = new Date(thatTime);
    var dayOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    //xét trường hợp năm nhuận
    if (today.getFullYear() % 400 == 0) {
      dayOfMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    } else {
      if (today.getFullYear() % 4 == 0) {
        dayOfMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      }
    }
    let rs: string = '';
    //chuyển ngày tháng năm giờ phút sang giây
    let distanceYear = today.getFullYear() - thatday.getFullYear();
    if (distanceYear <= 1) {
      let distanceMonth =
        distanceYear * 12 + today.getMonth() - thatday.getMonth();
      let distanceDate = today.getDate() - thatday.getDate();
      if (distanceMonth > 12) {
        rs = '1 năm';
      } else if (distanceMonth == 12) {
        if (distanceDate >= 0) {
          rs = '1 năm';
        } else {
          rs = '11 tháng';
        }
      } else {
        if (distanceMonth > 1) {
          if (distanceDate >= 0) {
            rs = distanceMonth + ' tháng';
          } else {
            rs = distanceMonth - 1 + ' tháng';
          }
        } else {
          if (distanceMonth==1) {
            if (distanceDate >= 0) {
              rs = distanceMonth + ' tháng';
            } else {
              rs = dayOfMonth[today.getMonth()]+distanceDate + ' ngày';
            }
          } else {
            let distanceHours = today.getHours() - thatday.getHours();
            if (distanceDate > 1) {
              if (distanceHours >= 0) {
                rs = distanceDate + ' ngày';
              } else{
                rs = distanceDate-1 + ' ngày';
              }
            }else{
              if (distanceDate==1) {
                if (distanceHours>=0) {
                  rs = '1 ngày';
                } else {
                  rs = 24+distanceHours+' giờ';
                }
              }else{
                let distanceMinutes = today.getMinutes() - thatday.getMinutes();
                if (distanceHours > 1) {
                  if (distanceMinutes>=0) {
                    rs =distanceHours+' giờ';
                  }else{
                    rs =distanceHours-1+' giờ';
                  }
                }else{
                  if (distanceHours == 1) {
                    if (distanceMinutes>=0) {
                      rs ='1 giờ';
                    }else{
                      rs =60+distanceMinutes+' phút';
                    }
                  }else{
                    if (distanceMinutes>0) {
                      rs =distanceMinutes+' phút';
                    }else{
                      rs =1+' phút';
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
        rs = distanceYear + ' năm';
      } else if (distanceMonth == 0) {
        let distanceDate = today.getDate() - thatday.getDate();
        if (distanceDate >= 0) {
          rs = distanceYear + ' năm';
        } else {
          rs = distanceYear - 1 + ' năm';
        }
      } else rs = distanceYear - 1 + ' năm';
    }
    return rs;
  }
  public getDate(time:string){
    // console.log(time);
    let rs:string ='';
    let thatday = new Date(time);
    let today = new Date();
    let timers:string = '';

    timers+=thatday.getHours()+':'+(thatday.getUTCMinutes()>=10?thatday.getUTCMinutes():'0'+thatday.getUTCMinutes());
    //Thời gian xa ,định dạng mm/dd/yyyy hh:mm
    rs = thatday.toLocaleDateString() +' ' + timers;

    //số ngày trong mỗi tháng
    var dayOfMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    //xét trường hợp năm nhuận
    if (today.getFullYear()%400==0){
        dayOfMonth = [31,29,31,30,31,30,31,31,30,31,30,31];
    }else{
      if (today.getFullYear()%4==0) {
        dayOfMonth = [31,29,31,30,31,30,31,31,30,31,30,31];
      }
    }

    //Thời gian gần (trong 1 tuần) , định dạng : Thứ .. giờ:phút
    var days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

    if (thatday.getFullYear()==today.getFullYear()) {
      //cùng tuần cùng tháng
      if (thatday.getMonth()==today.getMonth()){
        if ((today.getDate()==thatday.getDate())) {
          rs=timers;
        }else if ((today.getDate()-thatday.getDate())<7) {
            rs=days[thatday.getDay()]+' '+timers;
        }
      }
      //cùng tuần khác tháng
        if ((today.getMonth()-thatday.getMonth())==1){
          let todayDate = dayOfMonth[thatday.getMonth()]+today.getDate();
          if (todayDate-thatday.getDate()<7) {
            rs=days[thatday.getDay()]+' '+timers;
        }
      }
    }
    return rs;

  }
  public getTimeNofication(thatTime:string,thisTime: string){
    let time =this.getLastTime(thatTime,thisTime)
    if (time.match(' phút')){
      time.replace(' phút', '');
      let minutes= Number.parseInt(time);
      if (minutes<10) {
        return '';
      }else{
        return this.getDate(thisTime);
      }
    }else{
      return this.getDate(thisTime);
    }
  }
}
