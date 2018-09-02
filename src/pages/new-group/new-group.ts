import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'Firebase';

/**
 * Generated class for the NewGroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-group',
  templateUrl: 'new-group.html',
})
export class NewGroupPage {

  data = { groupname: '' };
  ref = firebase.database().ref('groups/');

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  newGroup() {
    let newData = this.ref.push();
    newData.set({
      groupname: this.data.groupname
    });
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewGroupPage');
  }

}
