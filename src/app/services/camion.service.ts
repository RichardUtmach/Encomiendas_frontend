import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Camion } from '../interfaces/camion';

@Injectable({
  providedIn: 'root',
})
export class CamionService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/camiones/';
  }

  getListCamiones(): Observable<Camion[]> {
    return this.http.get<Camion[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteCamion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  saveCamion(camion: Camion): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, camion);
  }

  getCamion(id: number): Observable<Camion> {
    return this.http.get<Camion>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  updateCamion(id: number, camion: Camion): Observable<void> {
    return this.http.put<void>(
      `${this.myAppUrl}${this.myApiUrl}${id}`,
      camion
    );
  }
}
