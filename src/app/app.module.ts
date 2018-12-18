import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {StoreModule} from '@ngrx/store';
import {IonicStorageModule} from '@ionic/storage';
import {DataService} from '../service/data.service';
import {LoaderService} from '../service/loader.service';
import {effects, metaReducers, reducers} from './app.reducers';
import {HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './login/store/auth.effects';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
      IonicModule.forRoot( {
          backButtonText: '',
          backButtonIcon: 'arrow-round-back',
      }),
      StoreModule.forRoot(reducers, {metaReducers} ),
      EffectsModule.forRoot(effects),
      IonicStorageModule.forRoot({
          name: '__tddb',
          driverOrder: ['localstorage']
      }),
      AppRoutingModule,
      HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DataService,
    LoaderService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
