import { Component, OnInit } from '@angular/core';
import { ContasPagar } from 'src/app/model/ContasPagar';
import { ContaspagarService } from 'src/app/service/contaspagar.service';

@Component({
  selector: 'app-contaspagar',
  templateUrl: './contaspagar.component.html',
  styleUrls: ['./contaspagar.component.css']
})
export class ContaspagarComponent implements OnInit {

  ctaspagar: Array<ContasPagar[]>;
  fornecedor: string;
  formapgto: string;
  contaorigem: string;
  contadestino: string;
  p: number;
  total: number;
  pagina: number;
  i: number;
  f: number;
  fp: number;

  constructor(private ctaService: ContaspagarService) { }

  ngOnInit() {
    this.ctaService.getContasPagarList().subscribe(data => {
      this.ctaspagar = data.content;
      this.total = data.totalElements;
    });
  }

  deleteContasPagar(id: number, index) {
    if (confirm('Deseja Realmente Excluir ?')) {
      this.ctaService.deletarContasPagar(id).subscribe(data => {
        this.ctaspagar.splice(index, 1);
      });
    }
  }

  consultaContasPagar() {
    if (this.fornecedor === '') {
      this.ctaService.getContasPagarList().subscribe(data => {
        this.ctaspagar = data.content;
        this.total = data.totalElements;
      });
    } else {
      this.ctaService.consultarContasPagar(this.fornecedor).subscribe(data => {
        this.ctaspagar = data.content;
        this.total = data.totalElements;
        this.fornecedor = '';
      });
    }
  }

  carregarPaginaCta(pagina) {
    if (this.fornecedor !== '') {
      this.ctaService.consultaContasPagarPage(this.fornecedor, (pagina - 1)).subscribe(data => {
        this.ctaspagar = data.content;
        this.total = data.totalElements;
      });
    } else {
      this.ctaService.getContasPagarListPage((pagina - 1)).subscribe(data => {
        this.ctaspagar = data.content;
        this.total = data.totalElements;
      });
    }
  }

  imprimirRelatorioCta() {
    return this.ctaService.downlaodPdfRelCta();
  }

}
