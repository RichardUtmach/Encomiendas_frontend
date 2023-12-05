import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Encomienda } from '../interfaces/encomienda';

@Injectable({
  providedIn: 'root',
})
export class EncomiendaService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/encomiendas/';
  }

  getListEncomiendas(): Observable<Encomienda[]> {
    return this.http.get<Encomienda[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteEncomienda(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  saveEncomienda(encomienda: Encomienda): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, encomienda);
  }

  getEncomienda(id: number): Observable<Encomienda> {
    return this.http.get<Encomienda>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

//   getEncomiendasPorCamion(id_camion: number): Observable<Encomienda[]> {
//     return this.http.get<Encomienda[]>(`${this.myAppUrl}${this.myApiUrl}/encomienda/camion/${id_camion}`);
// }


  updateEncomienda(id: number, encomienda: Encomienda): Observable<void> {
    return this.http.put<void>(
      `${this.myAppUrl}${this.myApiUrl}${id}`,
      encomienda
    );
  }
}
