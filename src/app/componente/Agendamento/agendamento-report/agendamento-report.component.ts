import { Component, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbDateParserFormatter, NgbDateStruct, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { AgeReport } from 'src/app/model/AgeReport';
import { AgendamentoService } from 'src/app/service/agendamento.service';

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

  format(date: NgbDateStruct): string | null {
    return date ? validarDia(date.day) + this.DELIMITER + validarDia(date.month) + this.DELIMITER + date.year : '';
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
  selector: 'app-agendamento-report',
  templateUrl: './agendamento-report.component.html',
  styleUrls: ['./agendamento-report.component.css'],
  providers: [{ provide: NgbDateParserFormatter, useClass: FormataData },
  { provide: NgbDateAdapter, useClass: FormatDateAdapter }]
})
export class AgendamentoReportComponent {

  ageReport = new AgeReport();

  constructor(private routeActive: ActivatedRoute, private ageService: AgendamentoService) { }

  imprimeRelatorioAgendamento() {
    this.ageService.downloadPdfRelAgeParam(this.ageReport);
  }
}
