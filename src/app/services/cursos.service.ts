import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private apiUrl = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + environment.token
    })
  }
  constructor(
    private http: HttpClient
  ) { }
  obtenerCursos(): Observable<any> {
    return this.http.get(this.apiUrl + 'cursos', this.httpOptions);
  }

  registrarCurso(curso: any): Observable<any> {

    return this.http.post(this.apiUrl + 'cursos', curso, this.httpOptions);

  }

  consultarCurso(id: number): Observable<any>{
    return this.http.get(this.apiUrl + 'cursos/' + id,this.httpOptions);
  }
  actualizarCurso(id:number, curso: any): Observable<any>{
    return this.http.put(this.apiUrl + 'cursos/' + id, curso,this.httpOptions )
  }

  inhabilitarCurso(id:number, curso: any): Observable<any>{
    return this.http.put(this.apiUrl + 'cursos/estado/' + id, curso,this.httpOptions )
  }
}
