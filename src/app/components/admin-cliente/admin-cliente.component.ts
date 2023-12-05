import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-admin-cliente',
  templateUrl: './admin-cliente.component.html',
  styleUrls: ['./admin-cliente.component.css'],
})
export class AdminClienteComponent implements OnInit {
  form: FormGroup;
  listClientes: Cliente[] = [];
  loading: boolean = false;
  id: number;
  operacion: string = 'Insertar';
  //selectedCliente: Cliente | null = null;

  constructor(
    private _clienteService: ClienteService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private aRouter: ActivatedRoute
  ) {
    this.form = this.fb.group({
      cedula: ['', Validators.required],
      nombres: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getListClientes();
  }

  opcionInsertar() {
    this.id = 0;
    this.operacion = 'Insertar ';
  }

  opcionEditar(id: number) {
    this.id = id;
    if (this.id != 0) {
      // Es editar
      this.operacion = 'Editar ';
      this.getCliente(this.id);
    }
  }

  getCliente(id: number) {
    this.loading = true;
    this._clienteService.getCliente(id).subscribe((data: Cliente) => {
      this.loading = false;
      this.form.setValue({
        cedula: data.cedula,
        nombres: data.nombres,
        telefono: data.telefono,
        direccion: data.direccion,
      });
    });
  }

  getListClientes() {
    this.loading = true;

    this._clienteService.getListClientes().subscribe((data: Cliente[]) => {
      this.listClientes = data;
      this.loading = false;
    });
  }

  addCliente() {

    const cliente: Cliente = {
      cedula: this.form.value.cedula,
      nombres: this.form.value.nombres,
      telefono: this.form.value.telefono,
      direccion: this.form.value.direccion,
    };
    this.loading = true;

    if (this.id !== 0) {
      // Es editar
      cliente.id = this.id;
      this._clienteService.updateCliente(this.id, cliente).subscribe(() => {
        this.toastr.info(
          `El cliente ${cliente.nombres} fue actualizado con exito :D`,
          'CLIENTE ACTUALIZADO'
        );
        this.limpiarDatos();
        this.getListClientes(); // Actualiza la lista de clientes
        this.loading = false;
 
      });
    } else {
      // Es agregar
      this._clienteService.saveCliente(cliente).subscribe(() => {
        this.toastr.success(
          `El cliente ${cliente.nombres} fue registrado con exito :D`,
          'CIENTE REGISTRADO'
        );
        this.limpiarDatos();
        this.getListClientes(); // Actualiza la lista de clientes
        this.loading = false;

      });
    }
  }

  deleteCliente(id: number) {
    this.loading = true;
    this._clienteService.deleteCliente(id).subscribe(() => {
      this.getListClientes();
      this.toastr.warning(
        'El cliente fue eliminado con exito',
        'CLIENTE ELIMINADO'
      );
    });
  }

  limpiarDatos() {
    this.form.reset();
  }
} //____________________END________________________
