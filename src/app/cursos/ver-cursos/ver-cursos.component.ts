import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CursosService } from '../../services/cursos.service';
import { Curso } from '../../models/curso.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-ver-cursos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule
  ],
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