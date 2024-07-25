import { Curso } from "../../app/models/curso.module";


export const courses:Array<Curso> = [
  {
    idCurso: 1,
    nombre: "Introducción a la Programación",
    Semestre: 1,
    fechaCreacion: "2024-01-15",
    descripcion: "Curso básico de introducción a la programación en Python."
  },
  {
    idCurso: 2,
    nombre: "Desarrollo Web con JavaScript",
    Semestre: 1,
    fechaCreacion: "2024-01-15",
    descripcion: "Curso para aprender a desarrollar aplicaciones web usando JavaScript, HTML y CSS."
  },
  {
    idCurso: 3,
    nombre: "Bases de Datos SQL",
    Semestre: 1,
    fechaCreacion: "2024-01-15",
    descripcion: "Curso sobre diseño y gestión de bases de datos relacionales utilizando SQL."
  },
  {
    idCurso: 4,
    nombre: "Machine Learning",
    Semestre: 2,
    fechaCreacion: "2024-07-01",
    descripcion: "Curso introductorio a los conceptos y técnicas de Machine Learning."
  },
  {
    idCurso: 5,
    nombre: "Desarrollo de Apps Móviles",
    Semestre: 2,
    fechaCreacion: "2024-07-01",
    descripcion: "Curso para aprender a desarrollar aplicaciones móviles para Android e iOS."
  },
  {
    idCurso: 6,
    nombre: "Ciberseguridad Básica",
    Semestre: 2,
    fechaCreacion: "2024-07-01",
    descripcion: "Curso básico sobre principios y prácticas de ciberseguridad."
  }
];