import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GroupPage } from '../group/group';
import { AuthService } from '../../services/auth.service';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
  // providers: [SigninPage, AuthService]
})
export class SigninPage {

  data = { nickname: "" };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  // constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  loginWithGoogle() {
    // this.auth.signInWithGoogle()
    //   .then(() => this.navCtrl.setRoot(GroupPage),
    //     error => console.log(error.message)
    //   );
    this.navCtrl.setRoot(GroupPage, {
      nickname: this.data.nickname
    });
  }

}
