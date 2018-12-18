import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../environments/environment';
import * as AuthReducers from './login/store/auth.reducer';
import {AuthEffects} from './login/store/auth.effects';

export interface AppState {
    Auth: AuthReducers.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
    Auth: AuthReducers.authReducers
}

export const effects = [
    AuthEffects,
];

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return function(state: AppState, action: any): AppState {
        console.log('state', state);
        console.log('action', action);
        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [logger] : [];
