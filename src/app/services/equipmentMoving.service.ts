import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../domain/user";
import { MovingEquipment } from '../domain/movingEquipment';
import { Equipment } from '../domain/equipment';
import { EquipmentMovingResponse } from '../domain/equipmentMovingResponse';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class EquipmentMovingService {

  private equipmentUrl = 'http://localhost:8080/api/equipmentMoving';

  constructor(private http: HttpClient) { }

  addEquipmentMoving(equipmentMovingResponse: EquipmentMovingResponse): Observable<EquipmentMovingResponse> {
    return this.http.post<EquipmentMovingResponse>(`${this.equipmentUrl}/addEquipmentMoving`,equipmentMovingResponse,httpOptions);
  }

  getAllEquipmentMovingWithUniqueEquipment(): Observable<MovingEquipment[]> {
    return this.http.get<MovingEquipment[]>(`${this.equipmentUrl}/getAllWithUniqueEquipment`, httpOptions);
  }

  getAllOrderByDate(): Observable<MovingEquipment[]> {
    return this.http.get<MovingEquipment[]>(`${this.equipmentUrl}/getAllOrderByDate`, httpOptions);
  }

  getAllByEquipment(equipmentName: string, equipmentSerialNumber:string): Observable<MovingEquipment[]> {
    return this.http.get<MovingEquipment[]>(`${this.equipmentUrl}/getAllMovingByEquipment`, {
      params: new HttpParams().append('equipmentName', equipmentName).append('equipmentSerialNumber',equipmentSerialNumber),
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
}
