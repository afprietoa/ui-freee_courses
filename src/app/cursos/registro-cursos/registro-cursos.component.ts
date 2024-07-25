import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CursosService } from '../../services/cursos.service';
import { Curso } from '../../models/curso.module';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-registro-cursos',
  standalone: true,
  templateUrl: './registro-cursos.component.html',
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