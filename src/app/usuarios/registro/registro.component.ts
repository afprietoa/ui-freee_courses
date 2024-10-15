import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-registro',
  standalone: true,
  templateUrl: './registro.component.html',
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
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit  {
  backgroundStyle = {
    'background': 'no-repeat center/contain url("./assets/images/LayoutLogin.png")',
    'background-size': '100% 100%',
    'display': 'flex',
    'justify-content': 'center',
    'align-items': 'center'
  };
  
  registroForm: FormGroup;
  
  ngOnInit(): void {}
  constructor(private fb: FormBuilder){
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      comentarios: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{6,}$')
      ]]
    });
  }

  onSubmit(){
    if(this.registroForm.valid){
      console.log(this.registroForm.value);
    } else {
      this.registroForm.markAllAsTouched();
      alert('Hay campos no válidos. Por favor, verifica la información.');
    }
  }

  // Método para mostrar alertas cuando el campo pierde el foco (blur)
  onBlur(field: string) {
    if (this.registroForm.controls[field].invalid && this.registroForm.controls[field].touched) {
      alert(`${field.charAt(0).toUpperCase() + field.slice(1)} no es válido`);
    }
  }
}
