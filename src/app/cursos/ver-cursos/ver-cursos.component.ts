import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CursosService } from '../../services/cursos.service';
import { Curso } from '../../models/curso.module';

@Component({
  selector: 'app-ver-cursos',
  templateUrl: './ver-cursos.component.html',
  styleUrls: ['./ver-cursos.component.css']
})
export class VerCursosComponent implements OnInit {
  cursoData: Curso | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cursosService: CursosService,
    public dialogRef: MatDialogRef<VerCursosComponent>
  ) { }

  ngOnInit(): void {
    const cursoId = this.data.id;

    this.cursosService.consultarCurso(cursoId).subscribe(
      (response: Curso | undefined) => {
        if (response) {
          this.cursoData = response;
          console.log(this.cursoData);
        } else {
          console.error('Curso no encontrado');
        }
      },
      (error: any) => {
        console.error('Error al obtener el curso', error);
      }
    );
  }
}