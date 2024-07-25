import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RegistroCursosComponent } from '../registro-cursos/registro-cursos.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CursosService } from '../../services/cursos.service'; 
import { VerCursosComponent } from '../ver-cursos/ver-cursos.component';
import { InhabilitarCursosComponent } from '../inhabilitar-cursos/inhabilitar-cursos.component';
import { EditarCursosComponent } from '../editar-cursos/editar-cursos.component';
import { Curso } from '../../models/curso.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listado-cursos',
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
  templateUrl: './listado-cursos.component.html',
  styleUrls: ['./listado-cursos.component.css']
})
export class ListadoCursosComponent implements OnInit, AfterViewInit {
  cursos: Curso[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'semestre', 'descripcion', 'fechaCreacion', 'acciones'];
  dataSource = new MatTableDataSource<Curso>(this.cursos);

  constructor(
    private cursosService: CursosService,
    public dialog: MatDialog
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.cargarCursos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarCursos() {
    this.cursosService.obtenerCursos().subscribe({
      next: (response: Curso[]) => {
        this.cursos = response;
        console.log(response);
        this.dataSource.data = this.cursos;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  abrirDialogoRegistro() {
    const dialogRef = this.dialog.open(RegistroCursosComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarCursos();
    });
  }

  verCurso(idCurso: number) {
    const dialogRef = this.dialog.open(VerCursosComponent, {
      width: '500px',
      data: { id: idCurso }
    });
  }

  abrirDialogoEditar(idCurso: number) {
    const dialogRefEdit = this.dialog.open(EditarCursosComponent, {
      width: '500px',
      data: { id: idCurso }
    });

    dialogRefEdit.afterClosed().subscribe(result => {
      this.cargarCursos();
    });
  }

  inhabilitarCurso(idCurso: number) {
    const dialogRefInh = this.dialog.open(InhabilitarCursosComponent, {
      width: '500px',
      data: { id: idCurso }
    });

    dialogRefInh.afterClosed().subscribe(result => {
      this.cargarCursos();
    });
  }
}