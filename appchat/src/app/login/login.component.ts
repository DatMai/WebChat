import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from '../model/userModel';
import { ChatService } from '../service/chat.service';
import { DataService } from '../service/data.service';
import { UserService } from '../service/user.service';
import { WebSocketService } from '../service/web-socket.service';
import  { environment } from 'src/environments/environment';


// declare const writeFile:any
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // file! : ;
  message ="";
  data:any
  alert="";
  user:UserModel={};
  registerPanel="";
  loginForm:FormGroup=this.createLoginForm();
  registerForm:FormGroup=this.createRegisterForm();

  constructor(private dataService:DataService,private fb:FormBuilder,private router:Router,private wss:WebSocketService )
  {
  }
  ngOnInit(): void {
    // if(sessionStorage.length>1){
    //   this.router.navigateByUrl('home');
    // }

    // this.dataService.message$.subscribe(value=>
    //   this.message=value
    // )
    // this.dataService.alert$.subscribe(value=>
    //   this.alert=value
    // )
  }

  createLoginForm():FormGroup{
    this.loginForm= this.fb.group({
      username:[null,Validators.required],
      password:[null,Validators.required]
    })
    return this.loginForm;
  }
  createRegisterForm():FormGroup{
    this.registerForm= this.fb.group({
      fullname:[null,Validators.required],
      username:[null,Validators.required],
      password:[null,Validators.required],
      // rePassword:[null,Validators.required],
      // email:[null,Validators.required]
    });
    return this.registerForm;
  }

  showRegisterPanel():void{
    this.registerPanel="right-panel-active";
    this.alert='';
  }
  hideRegisterPanel():void{
    this.registerPanel="";
    this.alert='';
  }

  login(){
    let username =this.loginForm.get('username')?.value;
    let password = this.loginForm.get('password')?.value;
    this.wss.login(username, password);
  }

  register() {
    let user = this.registerForm.value.username;
    let pass = this.registerForm.value.password;
    this.wss.register(user, pass);
  }


}


