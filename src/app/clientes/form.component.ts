import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  public cliente: Cliente = new Cliente();
  public titulo: string = 'Crear Cliente';

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedrouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activatedrouter.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.clienteService
          .getCliente(id)
          .subscribe((cliente) => (this.cliente = cliente));
      }
    });
  }

  create(): void {
    this.clienteService.create(this.cliente).subscribe((cliente) => {
      this.router.navigate(['/clientes']);
      Swal.fire(
        'Nuevo cliente',
        `El cliente ${cliente.nombre} ${cliente.apellido} ha sido creado con exito!`,
        'success'
      );
    });
  }
  update(): void {
    this.clienteService.update(this.cliente).subscribe((json) => {
      this.router.navigate(['/clientes']);
      Swal.fire(
        'Cliente actualizado',
        `${json.mensaje}: ${json.cliente.nombre} ${json.cliente.apellido}`,
        'success'
      );
    });
  }
}
