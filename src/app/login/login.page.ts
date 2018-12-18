import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {AuthOptions} from './store/auth.options';
import {select, Store} from '@ngrx/store';
import {AppState} from '../app.reducers';
import {LoginAction} from './store/auth.action';
import * as AuthReducers from './store/auth.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPage implements OnInit {

  public error: any = {
      valid: true,
      message: ''
  };
  public submitted = false;
  public login: AuthOptions = {username: '', password: ''};

  constructor(private modalCtrl: ModalController,
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.store.pipe(select(AuthReducers.selectToken)).subscribe(
        (token) => {
          if (token !== null && token !== undefined && token !== '') {
            this.modalCtrl.dismiss();
          }
        }
    );
  }

  public async dismiss() {
    await this.modalCtrl.dismiss();
  }

  async onLogin(form: NgForm) {
      this.submitted = true;

      if (form.valid) {
          /*await this.router.navigateByUrl('/tabs/(tab1:tab1)');*/
          this.store.dispatch(new LoginAction({account: this.login.username, password: this.login.password}));
          // await this.modalCtrl.dismiss();
      }
  }

  async onSignup() {
      await this.router.navigateByUrl('/signup');
  }

}
