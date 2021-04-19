import { Component, OnInit } from '@angular/core';
import { PlanoContas } from 'src/app/model/PlanoContas';
import { PlanocontasService } from 'src/app/service/planocontas.service';

@Component({
  selector: 'app-planocontas',
  templateUrl: './planocontas.component.html',
  styleUrls: ['./planocontas.component.css']
})
export class PlanocontasComponent implements OnInit {

  planoctas: Array<PlanoContas[]>;
  descricao: string;
  p: number;
  total: number;
  pagina: number;

  constructor(private planocontasService: PlanocontasService) { }

  ngOnInit() {
    this.planocontasService.getPlanoContasList().subscribe(data => {
      this.planoctas = data.content;
      this.total = data.totalElements;
    });
  }

  deletePlanoContas(id: number, index) {

    if (confirm('Deseja Realmente Excluir ?')) {
      this.planocontasService.deletarPlanoContas(id).subscribe(data => {
        this.planoctas.splice(index, 1);
      });
    }
  }

  consultaPlanoContas() {
    if ((this.descricao === '') || (this.descricao === null)) {
      this.planocontasService.getPlanoContasList().subscribe(data => {
        this.planoctas = data.content;
        this.total = data.totalElements;
      });
    } else {
      this.planocontasService.consultarPlanoContas(this.descricao).subscribe(data => {
        this.planoctas = data.content;
        this.total = data.totalElements;
        this.descricao = '';
      });
    }
  }

  carregarPaginaPcta(pagina) {
    if (this.descricao !== '') {
      this.planocontasService.consultaPlanoContasPage(this.descricao, (pagina - 1)).subscribe(data => {
        this.planoctas = data.content;
        this.total = data.totalElements;
      });
    } else {
      this.planocontasService.getPlanoContasPage(pagina - 1).subscribe(data => {
        this.planoctas = data.content;
        this.total = data.totalElements;
      });
    }
  }

  imprimeRelatorioPcta() {
    return this.planocontasService.downloadPdfRelPcta();
  }

}
