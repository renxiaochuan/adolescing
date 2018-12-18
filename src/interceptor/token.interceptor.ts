import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {LoaderService} from '../service/loader.service';
import {select, Store} from '@ngrx/store';
import {catchError, switchMap} from 'rxjs/operators';
import {AppState} from '../app/app.reducers';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public loader: LoaderService, public store: Store<AppState>) {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        /* return next.handle(req);*/
        return this.store.pipe(
            select(state => state.Auth),
            // take(1),
            switchMap((state) => {
                const token = state.token;
                req = req.clone({
                    setHeaders: {
                        Authorization: `${token}`
                    }
                });
                /* if (token === undefined || token === null || token === '') {
                    this.loader.hide().then(() => this.loader.showErrorMessage('请求Toekn无效, 请重新登录!')).catch(() => {
                        this.loader.showErrorMessage('请求Toekn无效, 请重新登录!');
                    });
                    return Observable.empty();
                } */
                return next.handle(req).pipe(
                    catchError((err: HttpErrorResponse) => {
                        let message = '';
                        if (err.status === 401) {
                            message = `token已过期, 请重新登录.`;
                        } else if (err.error instanceof Error) {
                            message = `发生错误: ${err.error.message}`;
                        } else {
                            message = `发生错误, 错误码: ${err.status}, 错误信息: ${err.error.message}`;
                        }
                        this.loader.hide().then(() => this.loader.showErrorMessage(message)).catch(() => {
                            this.loader.showErrorMessage(message);
                        });
                        return EMPTY;
                    })
                );
            })
        );
    }
}
