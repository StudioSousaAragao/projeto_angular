import { Component, OnInit } from '@angular/core';
import { FormaPagamento } from 'src/app/model/FormaPagamento';
import { FormapagamentoService } from 'src/app/service/formapagamento.service';

@Component({
  selector: 'app-formapagamento',
  templateUrl: './formapagamento.component.html',
  styleUrls: ['./formapagamento.component.css']
})
export class FormapagamentoComponent implements OnInit {

  fpas: Array<FormaPagamento[]>;
  descricao: string;
  contaorigem: string;
  contadestino: string;
  p: number;
  i: number;
  total: number;
  pagina: number;

  constructor(private formapagamentoService: FormapagamentoService) {

  }

  ngOnInit() {

    this.formapagamentoService.getFormaPagamentoList().subscribe(data => {
      this.fpas = data.content;
      this.total = data.totalElements;
    });
  }

  deleteFormaPagamento(id: number, index) {

    if (confirm('Deseja Realmente Excluir ?')) {
      this.formapagamentoService.deletarFormaPagamento(id).subscribe(data => {
        this.fpas.splice(index, 1);
      });
    }
  }

  consultaFormaPagamento() {
    if (this.descricao === '') {
      this.formapagamentoService.getFormaPagamentoList().subscribe(data => {
        this.fpas = data.content;
        this.total = data.totalElements;
      });
    } else {
      this.formapagamentoService.consultarFormaPagamento(this.descricao).subscribe(data => {
        this.fpas = data.content;
        this.total = data.totalElements;
        this.descricao = '';
      });
    }
  }

  carregarPaginaFpa(pagina) {
    if (this.descricao !== '') {
      this.formapagamentoService.consultarFormaPagamentoPage(this.descricao, (pagina - 1)).subscribe(data => {
        this.fpas = data.content;
        this.total = data.totalElements;
      });
    } else {
      this.formapagamentoService.getFormaPagamentoListPage(pagina - 1).subscribe(data => {
        this.fpas = data.content;
        this.total = data.totalElements;
      });
    }
  }

  imprimeRelatorioFpa() {
    return this.formapagamentoService.downloadPdfRelFpa();
  }

}
