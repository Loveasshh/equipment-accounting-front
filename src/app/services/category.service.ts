import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../domain/user";
import { MovingEquipment } from '../domain/movingEquipment';
import { Category } from '../domain/category';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  private categoryUrl = 'http://localhost:8080/api/category';

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.categoryUrl}/getAll`, httpOptions);
  }
}
