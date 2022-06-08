import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../domain/user";
import { MovingEquipment } from '../domain/movingEquipment';
import { Equipment } from '../domain/equipment';
import { JwtResponse } from '../auth/jwt-response';
import { SignUpInfo } from '../auth/signup-info';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {
private loginUrl = 'http://localhost:8080/api/auth/signup';
private userUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) { }

  getUserByName(name: string): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/getUserByName`, {
      params: new HttpParams().append('name', name),
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  attemptAuth(credentials: SignUpInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  existByUsername(username: string){
    return this.http.get<boolean>(`${this.userUrl}/existByUsername`,{
      params: new HttpParams().append('username', username),
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  deleteUser(username: string): Observable<string>{
    return this.http.post<string>(`${this.userUrl}/deleteUser`,{},{
      params: new HttpParams().append('username', username),
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  
  checkUser(username: string){
    return this.http.get<boolean>(`${this.userUrl}/checkUser`,{
      params: new HttpParams().append('username', username),
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
}
