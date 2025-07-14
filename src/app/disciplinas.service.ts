import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, PATH_ROOT_SUBJECTS } from 'src/environments/environment';
import { Disciplina } from './disciplinas/shared/dtos/disciplina';
import { DisciplinaCadastro } from './disciplinas/shared/dtos/disciplinaCadastro';
import { DisciplinaTable } from './disciplinas/shared/dtos/disciplinaTable';

@Injectable({
  providedIn: 'root'
})
export class DisciplinasService {

  constructor(
    private http: HttpClient
  ) { }

  save(disciplina: DisciplinaCadastro): Observable<Disciplina> {
    return this.http.post<Disciplina>(`${API_URL}${PATH_ROOT_SUBJECTS}`,
    disciplina);
  }

  update(disciplina: DisciplinaCadastro, id: number): Observable<Disciplina> {
    return this.http.put<Disciplina>(`${API_URL}${PATH_ROOT_SUBJECTS}/${id}`,
    disciplina);
  }

  findAll(): any {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.get<Array<any>>(`${API_URL}${PATH_ROOT_SUBJECTS}`,
      { headers: headers, responseType: "json" });
  }

  findById(id: number): Observable<DisciplinaTable> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.get<DisciplinaTable>(`${API_URL}${PATH_ROOT_SUBJECTS}/${id}`,
      { headers: headers, responseType: "json" });
  }

  deleteById(id: number): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.delete<any>(`${API_URL}${PATH_ROOT_SUBJECTS}/${id}`,
      { headers: headers, responseType: "json" });
  }
}
