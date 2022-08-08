import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import { of } from 'rxjs';

@Injectable()
export class ClienteService {
  constructor() {}

  getClientes(): Observable<Cliente[]> {
    return of(CLIENTES);
  }
}
