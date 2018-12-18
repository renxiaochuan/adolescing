import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class DataService {

    public getCommonHeader(): HttpHeaders {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        return headers;
    }

    public getJSONHeader(): HttpHeaders {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return headers;
    }
}
