import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Encomienda } from 'src/app/interfaces/encomienda';
import { EncomiendaService } from 'src/app/services/encomienda.service';
import { Camion } from 'src/app/interfaces/camion';
import { CamionService } from 'src/app/services/camion.service';

@Component({
  selector: 'app-control-enc',
  templateUrl: './control-enc.component.html',
  styleUrls: ['./control-enc.component.css'],
})
export class ControlEncComponent implements OnInit {
  listCamionesOcupados: Camion[] = [];
  listEncomiendasPorCamion: Encomienda[] = [];
  loading: boolean = false;
  id: number;

  estado_encomienda: string = '';
  var_recaudacion: number = 0;

  constructor(
    private _camionService: CamionService,
    private _encomiendaService: EncomiendaService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private aRouter: ActivatedRoute
  ) {
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getListCamionesOcupados();
  }

  opcionEntregar(id: number) {
    this.id = id;
    this.estado_encomienda = '✅Entregado';
    this.vaciarCamion();
  }

  opcionNoEntregar(id: number) {
    this.id = id;
    this.estado_encomienda = '❌No entregado';
    this.vaciarCamion();
  }

  vaciarCamion() {
    console.log('PRIMERO');
    this._camionService.getCamion(this.id).subscribe((data: Camion) => {
      console.log('SEGUNDO');
      var entregados = 0;
      var no_entregados = 0;
      if (this.estado_encomienda == '✅Entregado') {
        entregados = 1;
      } else {
        no_entregados = 1;
      }

      const camion: Camion = {
        camion_name: data.camion_name,
        placa: data.placa,
        propietario: data.propietario,
        capacidad: data.capacidad,
        peso: 0,
        estado: '✅Disponible',
        entregados: Number(data.entregados) + entregados,
        no_entregados: Number(data.no_entregados) + no_entregados,
        porcentaje:
          ((Number(data.entregados) + entregados) * 100) /
          (Number(data.entregados) +
            entregados +
            (Number(data.no_entregados) + no_entregados)),
        viajes: Number(data.viajes) + 1,
        recaudacion: data.recaudacion,
      };
      console.log('SEGUNDO.5');

      this._camionService.updateCamion(this.id, camion).subscribe(() => {
        this.getListCamionesOcupados();
        console.log('TERCERO');
        this.loading = false;
        if (this.estado_encomienda == '✅Entregado') {
          this.toastr.success(
            `Se han entregado todas las encomiendas del camion ${data.camion_name}  :D`,
            'ENCOMIENDAS ENTREGADAS'
          );
        } else {
          this.toastr.error(
            `NO han entregado las encomiendas del camion ${data.camion_name}  :'v`,
            'ENCOMIENDAS NO ENTREGADAS'
          );
        }
      });

      this._encomiendaService
        .getListEncomiendas()
        .subscribe((data: Encomienda[]) => {
          console.log('CUARTO');
          this.listEncomiendasPorCamion = data.filter(
            (c) => c.id_camion === this.id
          );

          this.listEncomiendasPorCamion.forEach((encomienda: Encomienda) => {
            console.log('QUINTO');
            const encomiendaActualizada: Encomienda = {
              peso: encomienda.peso,
              direccion: encomienda.direccion,
              costoenvio: encomienda.costoenvio,
              estado: this.estado_encomienda,
              id_camion: encomienda.id_camion,
            };
            this._encomiendaService
              .updateEncomienda(Number(encomienda.id), encomiendaActualizada)
              .subscribe(() => {
                console.log('SEXTO');
                if (this.estado_encomienda == '✅Entregado') {
                  this.var_recaudacion += Number(encomienda.costoenvio);
                }

                console.log('recaudacion: ' + this.var_recaudacion);

                this._camionService
                  .getCamion(this.id)
                  .subscribe((data: Camion) => {
                    const camion: Camion = {
                      camion_name: data.camion_name,
                      placa: data.placa,
                      propietario: data.propietario,
                      capacidad: data.capacidad,
                      peso: data.peso,
                      estado: data.estado,
                      entregados: data.entregados,
                      no_entregados: data.no_entregados,
                      porcentaje: data.porcentaje,
                      viajes: data.viajes,
                      recaudacion:
                        Number(data.recaudacion) + Number(this.var_recaudacion),
                    };
                    this._camionService
                      .updateCamion(this.id, camion)
                      .subscribe(() => {
                        console.log('finish');
                      });
                  });
              });
            console.log('SEPTIMO FUERA');
          });
          console.log('OCTAVO FUERA');
        });
      console.log('NOVENO FUERA');
    });
    console.log('DECIMO ULTIMO');
  }


  getListCamionesOcupados() {
    this.loading = true;
    this._camionService.getListCamiones().subscribe((data: Camion[]) => {
      this.listCamionesOcupados = data.filter((c) => c.estado === '🕓Ocupado');
      this.loading = false;
    });
  }
} //_______________________END________________
