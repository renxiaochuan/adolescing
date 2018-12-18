import {environment} from '../environments/environment';

export const AppProperties = {
    TOKEN: 'token',
    USERINFO: 'user_info',
    USERID: 'user_id',
    USERNAME: 'user_name',


    /*API_URL_AUTH: environment.baseUrl + 'basic/user/mobileLogin',*/
    API_URL_AUTH: environment.baseUrl + 'basic/user/login',
}
