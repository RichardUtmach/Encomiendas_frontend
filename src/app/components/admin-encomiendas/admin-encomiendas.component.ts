import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Encomienda } from 'src/app/interfaces/encomienda';
import { EncomiendaService } from 'src/app/services/encomienda.service';

@Component({
  selector: 'app-admin-encomiendas',
  templateUrl: './admin-encomiendas.component.html',
  styleUrls: ['./admin-encomiendas.component.css']
})
export class AdminEncomiendasComponent implements OnInit {

  form: FormGroup;
  listEncomiendas: Encomienda[] = [];
  loading: boolean = false;
  id: number;
  operacion: string = 'Insertar';
  varestado: string = 'new';
  id_camion: number = 0;


  constructor(
    private _encomiendaService: EncomiendaService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private aRouter: ActivatedRoute
  ) {
    this.form = this.fb.group({
      peso: [null, Validators.required],
      direccion: ['', Validators.required],
      costoenvio: [null, Validators.required]
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getListEncomiendas();
  }

  opcionInsertar() {
    this.id = 0;
    this.operacion = 'Insertar ';
    this.varestado="🔷Nuevo"
    this.id_camion= 0
  }

  opcionEditar(id: number) {
    this.id = id;
    if (this.id != 0) {
      // Es editar
      this.operacion = 'Editar ';
      this.getEncomienda(this.id);

      this._encomiendaService.getEncomienda(this.id).subscribe((data: Encomienda) => {
        this.varestado=data.estado
        this.id_camion=data.id_camion
      })
    }
  }

  getEncomienda(id: number) {
    this.loading = true;
    this._encomiendaService.getEncomienda(id).subscribe((data: Encomienda) => {
      this.loading = false;
      this.form.setValue({
        peso: data.peso,
        direccion: data.direccion,
        costoenvio: data.costoenvio,
        estado: data.estado
      });
    });
  }

  getListEncomiendas() {
    this.loading = true;

    this._encomiendaService.getListEncomiendas().subscribe((data: Encomienda[]) => {
      this.listEncomiendas = data;
      this.loading = false;
    });
  }

  addEncomienda() {

    const encomienda: Encomienda = {
      peso: this.form.value.peso,
      direccion: this.form.value.direccion,
      costoenvio: this.form.value.costoenvio,
      estado: this.varestado,
      id_camion: this.id_camion
    };
    this.loading = true;

    if (this.id !== 0) {
      // Es editar
      encomienda.id = this.id;
      this._encomiendaService.updateEncomienda(this.id, encomienda).subscribe(() => {
        this.toastr.info(
          `La encomienda fue actualizada con exito :D`,
          'ENCOMIENDA ACTUIALIZADA'
        );
        this.limpiarDatos();
        this.getListEncomiendas(); // Actualiza la lista de encomiendas
        this.loading = false;
        
      });
    } else {
      // Es agregar
      this._encomiendaService.saveEncomienda(encomienda).subscribe(() => {
        this.toastr.success(
          `La encomienda fue registrada con exito :D`,
          'ENCOMIENDA REGISTRADA'
        );
        this.limpiarDatos();
        this.getListEncomiendas(); // Actualiza la lista de encomiendas
        this.loading = false;
        
      });
    }
  }

  deleteEncomienda(id: number) {
    this.loading = true;
    this._encomiendaService.deleteEncomienda(id).subscribe(() => {
      this.getListEncomiendas();
      this.toastr.warning(
        'La encomienda fue eliminada con exito',
        'ENCOMIENDA ELIMINADA'
      );
    });
  }

  limpiarDatos() {
    this.form.reset();
  }

}//_________________________END__________________________
