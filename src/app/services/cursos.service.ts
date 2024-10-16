import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Curso } from '../models/curso.module';
import { courses } from '../../assets/static/courses';  // Importa el array de cursos

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private localStorageKey = 'cursos';

  constructor() {
    this.initializeLocalStorage();
  }

  // Inicializa localStorage con los cursos si está vacío
  private initializeLocalStorage(): void {
    if (!localStorage.getItem(this.localStorageKey)) {
      this.saveCursosToLocalStorage(courses);
    }
  }

  private getCursosFromLocalStorage(): Curso[] {
    const cursos = localStorage.getItem(this.localStorageKey);
    console.log(cursos);
    return cursos ? JSON.parse(cursos) : [];
  }

  private saveCursosToLocalStorage(cursos: Curso[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(cursos));
  }

  obtenerCursos(): Observable<Curso[]> {
    const cursos = this.getCursosFromLocalStorage();
    console.log(cursos);
    return of(cursos);
  }

  registrarCurso(curso: Curso): Observable<any> {
    const cursos = this.getCursosFromLocalStorage();
    curso.idCurso = cursos.length ? Math.max(...cursos.map(c => c.idCurso)) + 1 : 1;
    cursos.push(curso);
    this.saveCursosToLocalStorage(cursos);
    return of({ message: 'Curso registrado con éxito' });
  }

  consultarCurso(id: number): Observable<Curso | undefined> {
    const cursos = this.getCursosFromLocalStorage();
    const curso = cursos.find(c => c.idCurso === id);
    return of(curso);
  }

  actualizarCurso(id: number, cursoActualizado: Curso): Observable<any> {
    const cursos = this.getCursosFromLocalStorage();
    const cursoIndex = cursos.findIndex(c => c.idCurso === id);
    if (cursoIndex !== -1) {
      cursos[cursoIndex] = cursoActualizado;
      this.saveCursosToLocalStorage(cursos);
      return of({ message: 'Curso actualizado con éxito' });
    }
    return of({ error: 'Curso no encontrado' });
  }

  inhabilitarCurso(id: number): Observable<any> {
    const cursos = this.getCursosFromLocalStorage();
    const cursoIndex = cursos.findIndex(c => c.idCurso === id);
    if (cursoIndex !== -1) {
      cursos.splice(cursoIndex, 1);
      this.saveCursosToLocalStorage(cursos);
      return of({ message: 'Curso inhabilitado con éxito' });
    }
    return of({ error: 'Curso no encontrado' });
  }
}
