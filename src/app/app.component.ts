import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: String = 'Bienvenido a Angular';
  curso: String = 'Curso Spring 5 con Angular 9';
  alumno: String = 'Luis Londoño';
}
