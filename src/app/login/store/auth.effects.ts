import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import * as AuthAction from './auth.action';
import {map, switchMap, tap} from 'rxjs/operators';
import {AppProperties} from '../../app.properties';
import * as querystring from 'querystring';
import {DataService} from '../../../service/data.service';
import {Storage} from '@ionic/storage';
import {fromPromise} from 'rxjs/internal-compatibility';

@Injectable()
export class AuthEffects {

    constructor(private action$: Actions,
                private httpClient: HttpClient,
                private dataService: DataService,
                private storage: Storage) {
    }

    @Effect()
    public authLogin: Observable<Action> = this.action$.pipe(
        ofType<AuthAction.LoginAction>(AuthAction.LoginActionTypes.Login),
        map((action) => action.payload),
        switchMap((authData: {account: string, password: string}) => {
            return this.httpClient.get(AppProperties.API_URL_AUTH + '?' + querystring.stringify(authData), {
                headers: this.dataService.getCommonHeader(),
                responseType: 'json'
            });
        }),
        switchMap((res: any) => {
            const result = [];
            if (!res.success) {
                result.push(new AuthAction.SetLoginError({
                    valid: res.success,
                    message: res.message
                }));
            } else {
                this.storage.set(AppProperties.TOKEN, res.responseData.token);
                this.storage.set(AppProperties.USERINFO, res.responseData);
                result.push(new AuthAction.SetTokenAction(res.responseData.token, true, res.responseData));
            }
            return result;
        })
    );

    @Effect({dispatch: false})
    public logout: Observable<Action> = this.action$.pipe(
        ofType<AuthAction.Logout>(AuthAction.LoginActionTypes.Logout),
        tap( () => fromPromise(this.storage.remove(AppProperties.TOKEN)) ),
        tap( () => fromPromise(this.storage.remove(AppProperties.USERID))),
        tap(() => fromPromise(this.storage.remove(AppProperties.USERNAME))),
        tap(() => fromPromise(this.storage.remove(AppProperties.USERINFO))),
        map(() => {
            return {type: AuthAction.LoginActionTypes.Logout};
        })
    );
}
