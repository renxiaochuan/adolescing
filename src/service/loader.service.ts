import { Injectable } from '@angular/core';
import {AlertController, LoadingController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loading;

  constructor(private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {
  }

  public async show (content: string = '请稍后...') {
    if (!this.loading) {
      this.loading = await this.loadingCtrl.create({
          spinner: 'circles',
          message: content
      });
      await this.loading.present();
    }
  }

  public hide() {
    if (this.loading) {
      return this.loading.dismiss().then(() => {
        this.loading = null;
        return Promise.resolve();
      });
    }
    return Promise.reject('done');
  }

  public async showErrorMessage(message: string) {
    const alert = await this.alertCtrl.create({
        header: '错误',
        message: message,
        buttons: ['关闭']
    });
    await alert.present();
  }

  public async showSuccessMessage(message: string) {
    return new Promise(async (resolve) => {
        const alert = await this.alertCtrl.create({
            header: '提示',
            message: message,
            buttons: [{
              text: '确定',
              handler: (data) => { resolve(); }
            }]
        });
        alert.present();
    });
  }

  public async showConfirmCancelMessage(message: string) {
      return new Promise(async (resolve, reject) => {
          const alert = await this.alertCtrl.create({
              header: '提示',
              message: message,
              buttons: [{
                  text: '取消',
                  handler: (data) => {reject(); }
              }, {
                  text: '确定',
                  handler: (data) => {resolve(); }
              }]
          });
          alert.present();
      });
  }
}
