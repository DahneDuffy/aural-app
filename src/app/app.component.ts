import { AfterViewInit, Component, ViewChild } from '@angular/core';

import RecordRTC, { MediaStreamRecorder } from 'recordrtc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  title = 'aural-app';
  @ViewChild('audio') audio: any;
  mediaDevices = navigator.mediaDevices;

  private recordRTC: any;
  private stream!: MediaStream;
  
  
  //set the initial state of the audio?
  // ngAfterViewInit(){
  //   let audio: HTMLAudioElement = this.audio.nativeElement;
  //   audio.muted = false;
  //   audio.controls = true;
  //   audio.autoplay = false;
  // }

  // toggleControls(){
  //   let audio: HTMLAudioElement = this.audio.nativeElement;
  //   audio.muted = !audio.muted;
  //   audio.controls = !audio.controls;
  //   audio.autoplay = !audio.autoplay;
  // }

  successRecording(stream: MediaStream){
    let options: {} = {
      mimeType: 'audio/wav',
      recorderType: MediaStreamRecorder,
      timeSlice: 1000,
      audioBitsPerSecond: 128000,
    }
    this.recordRTC = new RecordRTC(stream,options)
    this.recordRTC.startRecording();
    let audio: HTMLAudioElement = this.audio.nativeElement;
    //audio.src = window.URL.createObjectURL(stream);
    // this.toggleControls()
  }

  //await user media permissions, then bind the MediaStream object
  async startRecording(){
    const stream = await this.mediaDevices.getUserMedia({
      video: false,
      audio: true
    })

    this.stream = stream;
    await this.successRecording(stream)
  }

  stopRecording(){
    let recordRTC = this.recordRTC;
    let audio: HTMLAudioElement = this.audio.nativeElement;

    recordRTC.stopRecording();
    this.stream.getAudioTracks().forEach(track => track.stop());
    setTimeout(()=>{audio.src = this.recordRTC.toURL();},1000)
  }

  download(){
    this.recordRTC.save('audio.wav')
    console.log(this.recordRTC)
  }
}

