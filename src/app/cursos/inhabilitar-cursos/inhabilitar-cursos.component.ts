import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CursosService } from '../../services/cursos.service'; 

@Component({
  selector: 'app-inhabilitar-cursos',
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
  templateUrl: './inhabilitar-cursos.component.html',
  styleUrls: ['./inhabilitar-cursos.component.css']
})
export class InhabilitarCursosComponent implements OnInit{

  mensaje: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cursosService: CursosService,
    public dialogRef: MatDialogRef<InhabilitarCursosComponent>
  ){}

  ngOnInit(): void {
    const id = this.data.id;

    
   this.cursosService.inhabilitarCurso(id).subscribe({
     next: (response: any) => {
       
      console.log(response);
      this.mensaje = response.data;
       
     },
     error: (error) => {
       console.log(error);
       this.mensaje = error.error.message;
     }
    });
  }

}