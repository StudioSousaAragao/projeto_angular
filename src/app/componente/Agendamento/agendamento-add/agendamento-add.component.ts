import { Component, OnInit, Injectable } from '@angular/core';
import { Agendamento } from 'src/app/model/Agendamento';
import { Cliente } from 'src/app/model/Cliente';
import { Servico } from 'src/app/model/Servico';
import { ActivatedRoute } from '@angular/router';
import { AgendamentoService } from 'src/app/service/agendamento.service';
import { NgbDateParserFormatter, NgbDateStruct, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class FormatDateAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '/'; //Ex: 28/01/2021

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
  selector: 'app-agendamento-add',
  templateUrl: './agendamento-add.component.html',
  styleUrls: ['./agendamento-add.component.css'],
  providers: [{ provide: NgbDateParserFormatter, useClass: FormataData },
    { provide: NgbDateAdapter, useClass: FormatDateAdapter }]    
})
export class AgendamentoAddComponent implements OnInit {

  agendamento = new Agendamento();

  servicos: Array<Servico>;

  clientes: Array<Cliente>;

  constructor(private routeActive: ActivatedRoute, private ageService: AgendamentoService) { }

  ngOnInit() {

    this.ageService.getClienteList().subscribe(data => {
       this.clientes = data.content;
    });

    this.ageService.getServicoList().subscribe(data => {
       this.servicos = data.content;
    });

    let id = this.routeActive.snapshot.paramMap.get('id');

    if (id != null ) {
      this.ageService.getAgendamento(id).subscribe(data => {
         this.agendamento = data;
      });
    }
  }

  salvarAgendamento() {
    if ((this.agendamento.id != null) && (this.agendamento.id.toString().trim() != null)) {
      this.ageService.updateAgendamento(this.agendamento).subscribe(data => {
        this.novo();
      });
    } else {
      this.ageService.salvarAgendamento(this.agendamento).subscribe(data => {
        this.novo();
      });
    }
  }

  novo() {
    this.agendamento = new Agendamento();
  }

}

