import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../domain/user";
import { MovingEquipment } from '../domain/movingEquipment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  private movingEquipmentUrl = 'http://localhost:8080/api/equipmentMoving';

  constructor(private http: HttpClient) { }

  getAllEquipmentMoving(): Observable<MovingEquipment[]> {
    return this.http.get<MovingEquipment[]>(`${this.movingEquipmentUrl}/getAll`, httpOptions);
  }
}
