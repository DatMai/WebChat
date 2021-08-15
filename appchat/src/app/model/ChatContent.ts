import { MessagesModel } from "./messageModel";
import { UserModel } from "./userModel";

export class ChatContent{
  name?:string;
  userList?:any;
  // messages?:{
  //   id?:number,
  //   message: string,
  //   userName: string,
  //   mine: boolean,
  //   createAt:string,
  //   description:string
  // }[];
  messages?:MessagesModel[];
  isGroup?:boolean;
  isSeen?:boolean;
  totalPage?:number;
}
