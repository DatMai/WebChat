import { DataService } from "../service/data.service";


export class MessagesModel{
  id!:number;
  message!: string;
  userName!: string;
  mine!: boolean;
  createAt!:string;
  description!: string;
  highlight!: boolean;
  constructor(){

  }
  public setMes(){
    this.description='MES';
  }
  public setNotification(){
    this.description='NOTIFICATION';
  }
  public setTimeNotificationMessage(message:string){
    this.createAt=message;
    this.mine=false;
    this.userName='Hệ Thống';
    this.message=message;
    this.description='NOTIFICATION';
  }
}
