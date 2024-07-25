import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CursosService } from '../../services/cursos.service';
import { Curso } from '../../models/curso.module';

@Component({
  selector: 'app-registro-cursos',
  templateUrl: './registro-cursos.component.html',
  styleUrls: ['./registro-cursos.component.css']
})
export class RegistroCursosComponent implements OnInit {
  registroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cursosService: CursosService,
    public dialogRef: MatDialogRef<RegistroCursosComponent>
  ) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]*$')]],
      descripcion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]*$')]],
      Semestre: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      fechaCreacion: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const curso: Curso = {
        idCurso: 0, // El ID se asignará automáticamente en el servicio
        nombre: this.registroForm.value.nombre,
        descripcion: this.registroForm.value.descripcion,
        Semestre: this.registroForm.value.Semestre,
        fechaCreacion: this.registroForm.value.fechaCreacion,
      };

      this.cursosService.registrarCurso(curso).subscribe({
        next: (response: any) => {
          console.log(response);
          alert('Curso registrado correctamente');
          this.dialogRef.close();
        },
        error: (error: any) => {
          console.error('Error al registrar el curso', error);
          alert('Ha ocurrido un error desconocido');
        }
      });
    } else {
      this.registroForm.markAllAsTouched();
    }
  }
}