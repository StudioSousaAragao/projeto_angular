import { Component, OnInit } from '@angular/core';
import { PlanoContas } from 'src/app/model/PlanoContas';
import { ActivatedRoute } from '@angular/router';
import { PlanocontasService } from 'src/app/service/planocontas.service';

@Component({
  selector: 'app-planocontas-add',
  templateUrl: './planocontas-add.component.html',
  styleUrls: ['./planocontas-add.component.css']
})
export class PlanocontasAddComponent implements OnInit {

  planocontas = new PlanoContas();

  constructor(private routeActive: ActivatedRoute, private planocontasServcice: PlanocontasService) { }

  ngOnInit() {
    let id = this.routeActive.snapshot.paramMap.get('id');

    if (id != null) {
      this.planocontasServcice.getPlanoContas(id).subscribe(data => {
        this.planocontas = data;
      });
    }
  }

    salvarPlanoContas() {
    if (this.planocontas.id != null && this.planocontas.id.toString().trim() != null) { /* Atualizando ou editando */
      this.planocontasServcice.updatePlanoContas(this.planocontas).subscribe(data => {
        this.novo();
      });
    } else {
      this.planocontasServcice.salvarPlanoContas(this.planocontas).subscribe(data => {
        this.novo();
      });
    }
  }

  novo() {
    this.planocontas = new PlanoContas();
  }

}
