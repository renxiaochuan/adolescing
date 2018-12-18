import {Component, OnDestroy, OnInit} from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {LoaderService} from '../service/loader.service';
import { Storage } from '@ionic/storage';
import {AppProperties} from './app.properties';
import * as AuthActions from './login/store/auth.action';
import {AppState} from './app.reducers';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  public subscription: Subscription;
  public isLogin = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private store: Store<AppState>,
    private loader: LoaderService,
    private storage: Storage
  ) {
    this.initializeApp();
    this.showErrorMessage();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  private showErrorMessage() {
    this.subscription = this.store.select('error').subscribe((message) => {
      if (message !== null && message !== undefined && message.message !== '') {
        this.loader.hide().then(() => {}).catch(() => {});
        this.loader.showErrorMessage(message.message);
      }
    });
  }

  public ngOnInit() {
    console.log('ionViewDidLoad AppComponent');
    Promise.all([this.storage.get(AppProperties.TOKEN),
        this.storage.get(AppProperties.USERINFO)]).then((value) => {
          const token = value[0];
          // console.log(token);
          if (token === null || token === undefined || token === '') {
            this.isLogin = false;
            return;
          } else {
            this.isLogin = true;
            this.store.dispatch(new AuthActions.SetTokenAction(token, true, value[1]));
          }
    });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
