import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Encomienda } from 'src/app/interfaces/encomienda';
import { EncomiendaService } from 'src/app/services/encomienda.service';
import { Camion } from 'src/app/interfaces/camion';
import { CamionService } from 'src/app/services/camion.service';

@Component({
  selector: 'app-guia-envio',
  templateUrl: './guia-envio.component.html',
  styleUrls: ['./guia-envio.component.css'],
})
export class GuiaEnvioComponent implements OnInit {
  form: FormGroup;
  listEncomiendas: Encomienda[] = [];
  listCamionesDisponibles: Camion[] = [];
  listCamiones: Camion[] = [];
  loading: boolean = false;
  id: number;
  operacion: string = 'Insertar';

  varpeso: number = 0;
  vardireccion: string = '';
  varcostoenvio: number = 0;
  varestado: string = '';
  id_camion: number = 0;

  varcamion_name: string = '';
  varplaca: string = '';
  varpropietario: string = '';
  varcapacidad: number = 0;
  varpesocargado: number = 0;
  varestadocamion: string = '';
  varentregados : number = 0;
  varno_entregados : number = 0;
  varporcentaje : number = 0;
  varviajes : number = 0;
  varrecaudacion : number = 0;

  constructor(
    private _encomiendaService: EncomiendaService,
    private _camionService: CamionService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private aRouter: ActivatedRoute
  ) {
    this.form = this.fb.group({
      id_camion: [null, Validators.required],
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getListEncomiendas();
    this.getListCamionesDisponibles();
    this.getListCamiones();
  }

  reiniciarVariables() {
    this.varpeso = 0;
    this.vardireccion = '';
    this.varcostoenvio = 0;
    this.varestado = '';
    this.id_camion = 0;

    this.varcamion_name = '';
    this.varplaca = '';
    this.varpropietario = '';
    this.varcapacidad = 0;
    this.varpesocargado = 0;
    this.varestadocamion = '';
    this.varentregados = 0;
    this.varno_entregados = 0;
    this.varporcentaje = 0;
    this.varviajes = 0;
    this.varrecaudacion = 0;
  }

  opcionEnviar(id: number) {
    this.id = id;
    if (this.id != 0) {
      this.operacion = 'Enviar';

      this._encomiendaService
        .getEncomienda(this.id)
        .subscribe((data: Encomienda) => {
          this.varpeso = data.peso;
          this.vardireccion = data.direccion;
          this.varcostoenvio = data.costoenvio;
          this.varestado = data.estado;
        });
    }
  }

  getListEncomiendas() {
    this.loading = true;

    this._encomiendaService
      .getListEncomiendas()
      .subscribe((data: Encomienda[]) => {
        this.listEncomiendas = data;
        this.loading = false;
      });
  }

  getListCamiones() {
    this.loading = true;
    this._camionService.getListCamiones().subscribe((data: Camion[]) => {
      this.listCamiones = data;
      this.loading = false;
    });
  }

  getListCamionesDisponibles() {
    this.loading = true;
    this._camionService.getListCamiones().subscribe((data: Camion[]) => {
      this.listCamionesDisponibles = data.filter(
        (c) => c.estado === '✅Disponible'
      );
      this.loading = false;
    });
  }

  setCamionOcupado(id: number) {
    this._camionService.getCamion(id).subscribe((data: Camion) => {
      
      const camion: Camion = {
        camion_name: data.camion_name,
        placa: data.placa,
        propietario: data.propietario,
        capacidad: data.capacidad,
        peso: data.peso,
        estado: '🕓Ocupado',
        entregados: data.entregados,
        no_entregados:data.no_entregados,
        porcentaje: data.porcentaje,
        viajes: data.viajes,
        recaudacion:data.recaudacion
      };

      this._camionService
            .updateCamion(id, camion)
            .subscribe(() => {
              console.log('SEGUNDOOOO');
              this.limpiarDatos();
              this.getListEncomiendas(); // Actualiza la lista de encomiendas
              this.getListCamiones();
              this.getListCamionesDisponibles();
              this.reiniciarVariables();
              this.loading = false;
              this.toastr.success(
                `El camión ${data.camion_name} ha partido a realizar las entregas`,
                'CAMIÓN ENVIADO'
              );
            });
    });
  }

  comprobarPesoCamion() {
    this.id_camion = this.form.value.camion_id;
    this._camionService
      .getCamion(this.form.value.id_camion)
      .subscribe((data: Camion) => {
        if (Number(data.peso) + Number(this.varpeso) <= data.capacidad) {
          this.varcamion_name = data.camion_name;
          this.varplaca = data.placa;
          this.varpropietario = data.propietario;
          this.varcapacidad = data.capacidad;
          this.varpesocargado = Number(data.peso) + Number(this.varpeso);
          this.varentregados= data.entregados,
          this.varno_entregados=data.no_entregados,
          this.varporcentaje= data.porcentaje,
          this.varviajes= data.viajes,
          this.varrecaudacion=data.recaudacion

          if (Number(data.peso) + Number(this.varpeso) == data.capacidad) {
            this.varestadocamion = '🕓Ocupado';

            this.toastr.success(
              `El camión ${data.camion_name} ha partido a realizar las entregas`,
              'CAMIÓN ENVIADO'
            );
          } else {
            this.varestadocamion = data.estado;
          }

          this.addEnvio();

        } else {
          this.toastr.error(
            `No hay capacidad de carga suficiente en este camion para el peso de esta encomienda, seleccione otro camión.`,
            'EXCESO DE PESO!'
          );
          this.reiniciarVariables();
          this.limpiarDatos();
        }
      });
  }

  addEnvio() {
    this.loading = true;

    const encomienda: Encomienda = {
      peso: this.varpeso,
      direccion: this.vardireccion,
      costoenvio: this.varcostoenvio,
      estado: '🚛Enviado',
      id_camion: this.form.value.id_camion,
    };

    const camion: Camion = {
      camion_name: this.varcamion_name,
      placa: this.varplaca,
      propietario: this.varpropietario,
      capacidad: this.varcapacidad,
      peso: this.varpesocargado,
      estado: this.varestadocamion,
      entregados: this.varentregados,
      no_entregados: this.varno_entregados,
      porcentaje: this.varporcentaje,
      viajes: this.varviajes,
      recaudacion: this.varrecaudacion
    };

    if (this.id !== 0) {
      encomienda.id = this.id;
      this._encomiendaService
        .updateEncomienda(this.id, encomienda)
        .subscribe(() => {
          this.toastr.success(
            `La encomienda ${encomienda.id} fue asignada al ${camion.camion_name} con exito :D`,
            'ENCOMIENDA ASIGNADA'
          );
          console.log('PRIMEROOOOO');

          this._camionService
            .updateCamion(this.form.value.id_camion, camion)
            .subscribe(() => {
              console.log('SEGUNDOOOO');
              this.limpiarDatos();
              this.getListEncomiendas(); // Actualiza la lista de encomiendas
              this.getListCamiones();
              this.getListCamionesDisponibles();
              this.reiniciarVariables();
              this.loading = false;
            });
        });
    }
  }

  limpiarDatos() {
    this.form.reset();
  }
} //_________________________END____________________
