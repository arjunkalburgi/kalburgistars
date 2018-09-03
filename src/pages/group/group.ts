import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewGroupPage } from '../new-group/new-group';
import { HomePage } from '../home/home';
import { SigninPage } from './../signin/signin';
import * as firebase from 'Firebase';

/**
 * Generated class for the GroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group',
  templateUrl: 'group.html',
})
export class GroupPage {

  groups = [];
  ref = firebase.database().ref('groups/');

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ref.on('value', snapshot => {
      this.groups = [];
      this.groups = snapshotToArray(snapshot);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupPage');
  }

  addGroup() {
    this.navCtrl.push(NewGroupPage);
  }

  joinGroup(key) {
    this.navCtrl.setRoot(HomePage, {
      key: key,
      nickname: this.navParams.get("nickname")
    });
  }

}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    // item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};