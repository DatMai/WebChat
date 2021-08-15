import { ChatContent } from "./ChatContent";

export class UserModel{
  fullname?:string;
  username?:string;
  password?:string;
  email?:string;
  friends?:any[];
  chatContents?:ChatContent[];
  status?:string;
}
