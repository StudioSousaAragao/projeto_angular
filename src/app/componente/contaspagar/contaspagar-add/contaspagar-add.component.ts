import { Component, OnInit, Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ContasPagar } from 'src/app/model/ContasPagar';
import { Fornecedor } from 'src/app/model/Fornecedor';
import { FormaPagamento } from 'src/app/model/FormaPagamento';
import { ActivatedRoute } from '@angular/router';
import { ContaspagarService } from 'src/app/service/contaspagar.service';
import { PlanoContas } from 'src/app/model/PlanoContas';

@Injectable()
export class FormatDateAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '/';

  fromModel(value: string): NgbDateStruct | null {

    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? validarDia(date.day) + this.DELIMITER + validarDia(date.month) + this.DELIMITER + date.year : null;
  }
}

@Injectable()
export class FormataData extends NgbDateParserFormatter {

  readonly DELIMITER = '/'; //Ex: 28/01/2021

  parse(value: string): NgbDateStruct | null {

    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }
  format(date: NgbDateStruct): string | null {

    return date ? validarDia(date.day) + this.DELIMITER + validarDia(date.month) + this.DELIMITER + date.year : '';

  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? validarDia(date.day) + this.DELIMITER + validarDia(date.month) + this.DELIMITER + date.year : null;
  }

}

function validarDia(valor) {
  if ((valor.toString !== '') && (parseInt(valor) <= 9)) {
    return '0' + valor;
  } else {
    return valor;
  }
}

@Component({
  selector: 'app-contaspagar-add',
  templateUrl: './contaspagar-add.component.html',
  styleUrls: ['./contaspagar-add.component.css'],
  providers: [{ provide: NgbDateParserFormatter, useClass: FormataData },
  { provide: NgbDateAdapter, useClass: FormatDateAdapter }]
})
export class ContaspagarAddComponent implements OnInit {

  contaspagar = new ContasPagar();

  fornecedores: Array<Fornecedor>;

  formaspagamento: Array<FormaPagamento>;

  planocontas: Array<PlanoContas>;

  constructor(private routeActive: ActivatedRoute, private ctaService: ContaspagarService) { }

  ngOnInit() {

    this.ctaService.getFornecedorList().subscribe(data => {
      this.fornecedores = data.content;
    });

    this.ctaService.getFormaPagamentoList().subscribe(data => {
      this.formaspagamento = data.content;
    });

    this.ctaService.getPlanoContasList().subscribe(data => {
      this.planocontas = data.content;
    });

    let id = this.routeActive.snapshot.paramMap.get('id');

    if (id != null) {
      this.ctaService.getContasPagar(id).subscribe(data => {
        this.contaspagar = data;
      });
    }

  }

  salvarContasPagar() {
    if ((this.contaspagar.id != null) && (this.contaspagar.id.toString().trim() != null)) {
      this.ctaService.updateContasPagar(this.contaspagar).subscribe(data => {
        this.novo();
      });
    } else {
      this.ctaService.salvarContasPagar(this.contaspagar).subscribe(data => {
        this.novo();
      });
    }
  }

  novo() {
    this.contaspagar = new ContasPagar();
  }

}
