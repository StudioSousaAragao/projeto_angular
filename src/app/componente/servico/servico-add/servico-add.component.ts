import { Component, OnInit } from '@angular/core';
import { Servico } from 'src/app/model/Servico';
import { ActivatedRoute } from '@angular/router';
import { ServicoService } from 'src/app/service/servico.service';
import { Categoria } from 'src/app/model/Categoria';


@Component({
  selector: 'app-servico-add',
  templateUrl: './servico-add.component.html',
  styleUrls: ['./servico-add.component.css']
})

export class ServicoAddComponent implements OnInit {

  servico = new Servico();

  categorias: Array<Categoria>;

  constructor(private routeActive: ActivatedRoute, private servService: ServicoService) { }

  ngOnInit() {

    this.servService.getCategoriaList().subscribe(data => {
      this.categorias = data.content;
    });

    let id = this.routeActive.snapshot.paramMap.get('id');

    if (id != null) {
      this.servService.getServico(id).subscribe(data => {
        this.servico = data;
      });
    }
  }

  salvarServico() {
    if ((this.servico.id != null) && (this.servico.id.toString().trim() != null)) {
      this.servService.updateServico(this.servico).subscribe(data => {
        this.novo();
      });
    } else {
      this.servService.salvarServico(this.servico).subscribe(data => {
        this.novo();
      });
    }
  }

  novo() {
    this.servico = new Servico();
  }
}
