import { Component, OnInit } from '@angular/core';
import { Servico } from 'src/app/model/Servico';
import { ServicoService } from 'src/app/service/servico.service';

@Component({
  selector: 'app-servico',
  templateUrl: './servico.component.html',
  styleUrls: ['./servico.component.css']
})
export class ServicoComponent implements OnInit {

  servs: Array<Servico[]>;
  descricao: string;
  p: number;
  total: number;
  pagina: number;
  c: number;

  constructor(private servService: ServicoService) { }

  ngOnInit() {

    this.servService.getServicoList().subscribe(data => {
      this.servs = data.content;
      this.total = data.totalElements;
    });
  }

  deleteServico(id: number, index) {
    if (confirm('Deseja Realmente Excluir ?')) {
      this.servService.deletarServico(id).subscribe(data => {
        this.servs.splice(index, 1);
      });
    }
  }

  consultaServico() {
    if (this.descricao === '') {
      this.servService.getServicoList().subscribe(data => {
        this.servs = data.content;
        this.total = data.totalElements;
      });
    } else {
      this.servService.consultarServico(this.descricao).subscribe(data => {
        this.servs = data.content;
        this.total = data.totalElements;
        this.descricao = '';
      });
    }
  }

  carregarPaginaServ(pagina) {
    if (this.descricao !== '') {
      this.servService.consultaServicoPage(this.descricao, (pagina - 1)).subscribe(data => {
        this.servs = data.content;
        this.total = data.totalElements;
      });
    } else {
      this.servService.getServicoListPage(pagina - 1).subscribe(data => {
        this.servs = data.content;
        this.total = data.totalElements;
      });
    }
  }

  imprimirRelatorioServ() {
    return this.servService.downloadPdfRelServ();
  }

}
