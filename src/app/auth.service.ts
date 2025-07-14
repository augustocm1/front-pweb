import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, PATH_ROOT_USERS } from 'src/environments/environment';
import { UserDTO } from './auth/shared/dtos/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  authentication(userDTO: UserDTO): Observable<any> {
    return this.http.post<any>(`${API_URL}${PATH_ROOT_USERS}/auth`,
      userDTO);
  }
}
