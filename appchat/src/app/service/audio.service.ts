import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  audio = new Audio();
  constructor() {
    this.audio.src = "../../../assets/audio/audioNGUA.mp3";
  }
  public playAudio(){
    this.audio.load();
    this.audio.play();
  }
}
