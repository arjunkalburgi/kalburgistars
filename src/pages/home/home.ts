import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { GroupPage } from './../group/group';
import { RestProvider } from '../../providers/rest/rest';
import * as firebase from 'Firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;

  data = { type: '', nickname: '', message: '' };
  groups = [];
  groupkey: string;
  nickname: string;
  offStatus: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider) {
    this.groupkey = this.navParams.get("key") as string;
    this.nickname = this.navParams.get("nickname") as string;
    this.data.type = 'message';
    this.data.nickname = this.nickname;
    
    let joinData = firebase.database().ref('groups/' + this.groupkey + '/chats').push();
    joinData.set({
      type: 'join',
      user: this.nickname,
      message: this.nickname + ' has joined this room.',
      sendDate: Date()
    });
    this.data.message = '';

    firebase.database().ref('groups/' + this.groupkey + '/chats').on('value', resp => {
      this.groups = [];
      this.groups = snapshotToArray(resp);
      setTimeout(() => {
        if (this.offStatus === false) {
          this.content.scrollToBottom(300);
        }
      }, 1000);
    });
  }

  ionViewDidLoad() {
    // this.getCountries();
  }

  // getCountries() {
  //   this.rest.getCountries()
  //     .subscribe(
  //       countries => this.countries = countries,
  //       error => this.errorMessage = <any>error);
  // }

  sendMessage() {
    let newData = firebase.database().ref('groups/' + this.groupkey + '/chats').push();
    newData.set({
      type: this.data.type,
      user: this.data.nickname,
      message: this.data.message,
      sendDate: Date()
    });
    this.data.message = '';
  }

  exitChat() {
    let exitData = firebase.database().ref('groups/' + this.groupkey + '/chats').push();
    exitData.set({
      type: 'exit',
      user: this.nickname,
      message: this.nickname + ' has exited this room.',
      sendDate: Date()
    });

    this.offStatus = true;

    this.navCtrl.setRoot(GroupPage, {
      nickname: this.nickname
    });
  }

}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};