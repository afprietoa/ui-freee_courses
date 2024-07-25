import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CursosService } from '../../services/cursos.service'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Curso } from '../../models/curso.module';

@Component({
  selector: 'app-editar-cursos',
  templateUrl: './editar-cursos.component.html',
  styleUrls: ['./editar-cursos.component.css']
})
export class EditarCursosComponent implements OnInit {
  editForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cursosService: CursosService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditarCursosComponent>
  ) {
    this.editForm = this.formBuilder.group({
      idCurso: [''],
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ.,-_ñÑ ]*$')]],
      descripcion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ.,-_ñÑ ]*$')]],
      Semestre: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      fechaCreacion: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const cursoId = this.data.id;
    
    this.cursosService.consultarCurso(cursoId).subscribe({
      next: (curso: Curso | undefined) => {
        if (curso) {
          this.editForm.setValue({
            idCurso: curso.idCurso,
            nombre: curso.nombre,
            descripcion: curso.descripcion,
            Semestre: curso.Semestre,
            fechaCreacion: curso.fechaCreacion,
          });
        } else {
          console.error('Curso no encontrado');
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const curso: Curso = {
        idCurso: this.editForm.value.idCurso,
        nombre: this.editForm.value.nombre,
        descripcion: this.editForm.value.descripcion,
        Semestre: this.editForm.value.Semestre,
        fechaCreacion: this.editForm.value.fechaCreacion,
      };

      this.cursosService.actualizarCurso(curso.idCurso, curso).subscribe({
        next: (response: any) => {
          alert('Curso actualizado correctamente');
          this.dialogRef.close();
        },
        error: (error: any) => {
          console.error('Error al actualizar el curso', error);
        }
      });
    } else {
      this.editForm.markAllAsTouched();
    }
  }
}