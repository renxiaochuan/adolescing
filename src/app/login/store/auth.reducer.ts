import {UserInfoModel} from '../../../model/user-info.model';
import * as AuthAction from './auth.action';
import {createFeatureSelector, createSelector} from '@ngrx/store';


export interface AuthState {
    token: string;
    authenticated: boolean;
    error: any;
    userInfo: UserInfoModel;
}

const initialState: AuthState = {
    token: null,
    authenticated: false,
    error: {valid: true, message: ''},
    userInfo: new UserInfoModel(),
};

export function authReducers(state = initialState, action: AuthAction.AuthActions): AuthState {
    switch (action.type) {
        case AuthAction.LoginActionTypes.SetAuthenticated:
            return {...state, authenticated: action.isAuthenticated};
        case AuthAction.LoginActionTypes.SetToken:
            return {...state, token: action.token,
                authenticated: action.isAuthenticated,
                error: {
                    valid: true,
                    message: ''
                },
                userInfo: action.userInfo};
        case AuthAction.LoginActionTypes.SetLoginError:
            return {...state, error: {valid: action.error.valid, message: action.error.message}};
        case AuthAction.LoginActionTypes.Logout:
            return {
                ...state,
                token: null,
                authenticated: false,
                error: {
                    valid: true,
                    message: ''
                },
                userInfo: new UserInfoModel()
            };
        default:
            return state;
    }
}

export const selectAuthState = createFeatureSelector<AuthState>('Auth');
export const getToken = (state: AuthState) => state.token;
export const selectToken = createSelector(
    selectAuthState,
    (state: AuthState) => state.token
);
