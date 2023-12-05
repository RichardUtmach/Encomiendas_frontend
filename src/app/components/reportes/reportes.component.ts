import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute} from '@angular/router';
import { Camion } from 'src/app/interfaces/camion';
import { CamionService } from 'src/app/services/camion.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  listCamiones: Camion[] = [];
  loading: boolean = false;
  id: number;

  constructor(
    private _camionService: CamionService,
    private aRouter: ActivatedRoute
  ) {
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getListCamiones();
  }

  getListCamiones() {
    this.loading = true;
    this._camionService.getListCamiones().subscribe((data: Camion[]) => {
      this.listCamiones = data;
      this.loading = false;
    });
  }

} //_______________________END________________

