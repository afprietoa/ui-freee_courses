import { Routes } from '@angular/router';
import { ListadoCursosComponent } from './cursos/listado-cursos/listado-cursos.component';
import { RegistroComponent } from './usuarios/registro/registro.component';

export const routes: Routes = [
    {path: '', component: RegistroComponent},
];
