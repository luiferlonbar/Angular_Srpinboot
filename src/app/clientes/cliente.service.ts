import { Injectable, Type } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import { of, throwError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  constructor(private http: HttpClient, private router: Router) {}
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  getClientes(): Observable<Cliente[]> {
    //return of(CLIENTES);
    return this.http
      .get<Cliente[]>(this.urlEndPoint)
      .pipe(map((response) => response as Cliente[])); //como es de tipo observable se hace un cast para que sea del tipo Cliente
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post(this.urlEndPoint, cliente, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((response: any) => response.cliente as Cliente),
        catchError((e) => {
          console.error(e.error.mensaje);
          swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(() => new Error(e));
        })
      );
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar ', e.error.mensaje, 'error');
        return throwError(() => new Error(e));
      })
    );
  }
  update(cliente: Cliente): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          console.error(e.error.mensaje);
          swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(() => new Error(e));
        })
      );
  }
  delete(id: number): Observable<Cliente> {
    return this.http
      .delete<Cliente>(`${this.urlEndPoint}/${id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          console.error(e.error.mensaje);
          swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(() => new Error(e));
        })
      );
  }
}
