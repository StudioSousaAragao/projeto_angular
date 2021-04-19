import { Component, OnInit } from '@angular/core';
import { AgendamentoService } from 'src/app/service/agendamento.service';
import { Agendamento } from 'src/app/model/agendamento';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent implements OnInit {

  ages: Array<Agendamento[]>;
  nome: string;
  servico: string;
  p: number;
  total: number;
  pagina: number;
  i: number;
  a: number;
  s: number;

  constructor(private ageService: AgendamentoService) { }

  ngOnInit() {
    this.ageService.getAgendamentoList().subscribe(data => {
      this.ages = data.content;
      this.total = data.totalElements;
    });
  }

  deleteAgendamento(id: number, index) {
    if (confirm('Deseja Realmente Excluir ?')) {
      this.ageService.deletarAgendamento(id).subscribe(data => {
        this.ages.splice(index, 1);
      });
    }
  }

  consultaAgendamento() {
    if (this.nome === '') {
      this.ageService.getAgendamentoList().subscribe(data => {
        this.ages = data.content;
        this.total = data.totalElements;
      });
    } else {
      this.ageService.consultarAgendamento(this.nome).subscribe(data => {
        this.ages = data.content;
        this.total = data.totalElements;
        this.nome = '';
      });
    }
  }

  carregarPaginaAge(pagina) {
    if (this.nome !== '') {
      this.ageService.consultaAgendamentoPage(this.nome, (pagina - 1)).subscribe(data => {
        this.ages = data.content;
        this.total = data.totalElements;
      });
    } else {
      this.ageService.getAgendamentoListPage((pagina - 1)).subscribe(data => {
        this.ages = data.content;
        this.total = data.totalElements;
      });
    }
  }

  imprimirRelatorioAge() {
    return this.ageService.downlaodPdfRelAge();
  }
}
