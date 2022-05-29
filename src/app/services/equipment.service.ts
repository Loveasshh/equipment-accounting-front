import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../domain/user";
import { MovingEquipment } from '../domain/movingEquipment';
import { Equipment } from '../domain/equipment';
import { EquipmentResponse } from '../domain/equipmentResponse';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class EquipmentService {

  private equipmentUrl = 'http://localhost:8080/api/equipment';

  constructor(private http: HttpClient) { }

  addEquipment(equipment: EquipmentResponse): Observable<EquipmentResponse> {
    return this.http.post<EquipmentResponse>(`${this.equipmentUrl}/add`,equipment,httpOptions);
  }
  getAllEquipment(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`${this.equipmentUrl}/getAll`, httpOptions);
  }
  getEquipmentByName(equipmentName: string): Observable<Equipment> {
    return this.http.get<Equipment>(`${this.equipmentUrl}/getEquipmentByName`, {
      params: new HttpParams().append('equipmentName', equipmentName),
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
}
