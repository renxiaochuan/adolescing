import {Action} from '@ngrx/store';
import {UserInfoModel} from '../../../model/user-info.model';
export enum LoginActionTypes {
    Login = '[Auth] Login',
    Logout = '[Auth] Logout',
    SetToken = '[Auth] SetToken',
    SetAuthenticated = '[Auth] SetAuthenticated',
    SetLoginError = '[Auth] SetLoginError',
}
export class LoginAction implements Action {
    public readonly type = LoginActionTypes.Login;
    constructor(public payload: {account: string, password: string}) {}
}

export class SetAuthenticated implements Action {
    public readonly type = LoginActionTypes.SetAuthenticated;
    constructor(public isAuthenticated: boolean) {}
}

export class SetTokenAction implements Action {
    public readonly  type = LoginActionTypes.SetToken;
    constructor(public token: string,
        public isAuthenticated: boolean,
        public userInfo: UserInfoModel = new UserInfoModel()) {}
}

export class SetLoginError implements Action {
    public readonly type = LoginActionTypes.SetLoginError;
    constructor(public error: {valid: boolean, message: string}) {}
}

export class Logout implements Action {
    public readonly type = LoginActionTypes.Logout;
}

export type AuthActions = LoginAction
    | SetTokenAction
    | SetAuthenticated
    | SetLoginError
    | Logout;
