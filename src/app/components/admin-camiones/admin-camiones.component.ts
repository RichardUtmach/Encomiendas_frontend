import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Camion } from 'src/app/interfaces/camion';
import { CamionService } from 'src/app/services/camion.service';



@Component({
  selector: 'app-admin-camiones',
  templateUrl: './admin-camiones.component.html',
  styleUrls: ['./admin-camiones.component.css']
})
export class AdminCamionesComponent implements OnInit {
  form: FormGroup;
  listCamiones: Camion[] = [];
  loading: boolean = false;
  id: number;
  operacion: string = 'Insertar';
  

  varpeso : number = 0;
  varestado : string = "nuevo";
  varentregados : number = 0;
  varno_entregados : number = 0;
  varporcentaje : number = 0;
  varviajes : number = 0;
  varrecaudacion : number = 0;

  constructor(
    private _camionService: CamionService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private aRouter: ActivatedRoute
  ) {
    this.form = this.fb.group({
      camion_name: ['', Validators.required],
      placa: ['', Validators.required],
      propietario: ['', Validators.required],
      capacidad: [null, Validators.required],
      
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getListCamiones();
  }

  opcionInsertar() {
    this.id = 0;
    this.operacion = 'Insertar';
    this.varestado="✅Disponible",
    this.varpeso=0,
    this.varentregados=0,
    this.varno_entregados=0,
    this.varporcentaje=0,
    this.varviajes=0,
    this.varrecaudacion=0
  }

  opcionEditar(id: number) {
    this.id = id;
    if (this.id != 0) {
      // Es editar
      this.operacion = 'Editar';
      this.getCamion(this.id);

      this._camionService.getCamion(this.id).subscribe((data: Camion) => {
        this.varestado=data.estado,
        this.varpeso=data.peso
        this.varentregados=data.entregados,
        this.varno_entregados=data.no_entregados,
        this.varporcentaje=data.porcentaje,
        this.varviajes=data.viajes,
        this.varrecaudacion=data.recaudacion
      })

    }
  }

  getCamion(id: number) {
    this.loading = true;
    this._camionService.getCamion(id).subscribe((data: Camion) => {
      this.loading = false;
      this.form.setValue({
        camion_name: data.camion_name,
        placa: data.placa,
        propietario: data.propietario,
        capacidad: data.capacidad,

      });
    });
  }

  getListCamiones() {
    this.loading = true;
    this._camionService.getListCamiones().subscribe((data: Camion[]) => {
      this.listCamiones = data;
      this.loading = false;
    });

    
  }


  addCamion() {
    
    const camion: Camion = {
      camion_name: this.form.value.camion_name,
      placa: this.form.value.placa,
      propietario: this.form.value.propietario,
      capacidad: this.form.value.capacidad,
      peso: this.varpeso,
      estado: this.varestado,
      entregados: this.varentregados,
      no_entregados:this.varno_entregados,
      porcentaje: this.varporcentaje,
      viajes: this.varviajes,
      recaudacion:this.varrecaudacion


    };
    this.loading = true;

    if (this.id !== 0) {
      // Es editar

      camion.id = this.id;
      this._camionService.updateCamion(this.id, camion).subscribe(() => {
        this.toastr.info(
          `El camion ${camion.camion_name} fue actualizado con exito :D`,
          'CAMION ACTUALIZADO'
        );
        this.limpiarDatos();
        this.getListCamiones(); // Actualiza la lista de camions
        this.loading = false;
 
      });
    } else {
      // Es agregar
      this._camionService.saveCamion(camion).subscribe(() => {
        this.toastr.success(
          `El camion ${camion.camion_name} fue registrado con exito :D`,
          'CAMION REGISTRADO'
        );
        this.limpiarDatos();
        this.getListCamiones(); // Actualiza la lista de camions
        this.loading = false;

      });
    }
  }

  deleteCamion(id: number) {
    this.loading = true;
    this._camionService.deleteCamion(id).subscribe(() => {
      this.getListCamiones();
      this.toastr.warning(
        'El camion fue eliminado con exito',
        'CAMION ELIMINADO'
      );
    });
  }

  limpiarDatos() {
    this.form.reset();
  }


}//_______________________END________________

