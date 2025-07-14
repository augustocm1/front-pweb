import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL, PATH_ROOT_TEACHERS } from 'src/environments/environment';
import { Professor } from './professores/shared/models/dtos/professor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfessoresService {

  constructor(
    private http: HttpClient
  ) { }

  save(professor: Professor): Observable<Professor> {
    return this.http.post<Professor>(`${API_URL}${PATH_ROOT_TEACHERS}`,
    professor);
  }

  update(professor: Professor, id: number): Observable<Professor> {
    return this.http.put<Professor>(`${API_URL}${PATH_ROOT_TEACHERS}/${id}`,
    professor);
  }

  findAll(): Observable<Array<Professor>> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.get<Array<Professor>>(`${API_URL}${PATH_ROOT_TEACHERS}`,
      { headers: headers, responseType: "json" });
  }

  findById(id: number): Observable<Professor> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.get<Professor>(`${API_URL}${PATH_ROOT_TEACHERS}/${id}`,
      { headers: headers, responseType: "json" });
  }

  deleteById(id: number): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.delete<any>(`${API_URL}${PATH_ROOT_TEACHERS}/${id}`,
      { headers: headers, responseType: "json" });
  }
}
