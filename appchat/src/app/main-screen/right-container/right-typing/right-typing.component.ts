import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { EmojisModel } from 'src/app/model/emojisModel';
import { GroupChat } from 'src/app/model/GroupChat';
import { UserModel } from 'src/app/model/userModel';
import { ChatService } from 'src/app/service/chat.service';
import { DataService } from 'src/app/service/data.service';
import emojis from "../../.././data/emojis.json";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AngularFireStorage} from "@angular/fire/storage";
import Callback = JQuery.Deferred.Callback;




declare var $: any;

@Component({
  selector: 'app-right-typing',
  templateUrl: './right-typing.component.html',
  styleUrls: ['./right-typing.component.scss'],
})
export class RightTypingComponent implements OnInit,AfterViewInit {
  @Input() selectedUser: UserModel = {};
  selectedGroup: GroupChat = {};
  selectedEmoji: EmojisModel = {};
  checkEmojisShow: boolean = false;
  checkGifShow: boolean = false;
  background: string = 'black';
  backgroundInput:string="#222323"
  emojisList: {
    emoji?: string;
    name?: string;
    shortname?: string;
    unicode?: string;
    html?: string;
    category?: string;
    order?: string;
  }[] = emojis;



  refImage:string ="";

  // emojisList: {
  //   [key: string]: {
  //       unicode: string[];
  //       fname: string;
  //       uc: string;
  //       isCanonical: boolean;
  //   }
  // }= emojione.emojioneList;

  message: string = '';

  constructor(
    private dataService: DataService,
    private chatService: ChatService,
    private http : HttpClient,
    private af : AngularFireStorage
  ) {}
  ngAfterViewInit(): void {

  }
  public darkMode() {
    return this.dataService.isDarkMode;
  }
  ngOnInit(): void {
    this.dataService.selectedEmoji$.subscribe(
      (value) => (this.selectedEmoji = value)
    );

    }

    public async sendImage(event:any){
      await this.fileUpload(event);
      this.callback();
    }

    public async fileUpload(event:any){
    let selectedFiles:string = event.target.files[0];
     let storage = this.af.storage;
     let fileName :string = "/image"+Math.random()+".jpg"
      let downloadURL = "gs://appchat-b16ea.appspot.com"+fileName

     await this.af.upload(fileName,selectedFiles);
      this.refImage = downloadURL


    }


  public callback () {
    let gsReference = this.af.storage.refFromURL(this.refImage);
    gsReference.getDownloadURL().then((url)=>{
      this.chatService.sendTo(url);
    })
   }




  checkShowManager(){
    return this.dataService.isShowManager;
  }

  public gifClick(){
    this.checkGifShow = !this.checkGifShow;
  }
  public isChatBoxSelected() {
    return this.chatService.isChatBoxSelected();
  }
  public selectEmoji(emojis: EmojisModel) {
    this.dataService.selectedEmoji$.next({});
    this.selectedEmoji = emojis;
    console.log(this.selectEmoji);
    this.message = this.message + this.selectedEmoji.emoji;
  }
  public showEmoji() {
    $("#emotions").emojioneArea({
      // standalone:true,
      pickerPosition: "top",
      toneStyle:"bullet",
    });
    var el = $("#emotions").emojioneArea();
    var message  = $("#emotions").val();
    el[0].emojioneArea.on("emojibtn.click", function(btn) {
      console.log(btn.html());
      // message+=btn.data().name;
      $("#chatContent").html(btn.html());

    });
    // console.log(1);
    // this.checkEmojisShow = !this.checkEmojisShow;
  }

  public sendTo() {
    this.chatService.sendTo(this.message);
    this.message = '';
  }
}
