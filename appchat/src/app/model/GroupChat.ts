import { UserModel } from "./userModel";

export class GroupChat{
  name?:string;
  userList?:any;
  messages?:{
    message: string,
    userName: string,
    mine: boolean
  }[];
}
