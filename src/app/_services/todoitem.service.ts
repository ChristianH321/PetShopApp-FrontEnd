import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Todoitem } from '../_models/todoitem';
import { AuthenticationService } from './authentication.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable()
export class TodoItemService {
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  getItems(): Observable<Todoitem[]> {
    // add authorization header with jwt token
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + this.authenticationService.getToken());

    // get users from api
    return this.http.get<Todoitem[]>(environment.apiUrl + '/todo/', httpOptions);
  }
}
