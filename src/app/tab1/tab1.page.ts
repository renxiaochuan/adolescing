import { Component } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {LoginPage} from '../login/login.page';
import {Tab2Page} from '../tab2/tab2.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public isAuthenticated = false;

  constructor(private modalCtrl: ModalController) {}

  public async login() {
      const modal = await this.modalCtrl.create({
          component: LoginPage,
          componentProps: { value: null }
      });
    return await modal.present();
  }
}
