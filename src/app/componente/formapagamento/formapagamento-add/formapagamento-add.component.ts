import { Component, OnInit } from '@angular/core';
import { FormaPagamento } from 'src/app/model/FormaPagamento';
import { ActivatedRoute } from '@angular/router';
import { FormapagamentoService } from 'src/app/service/formapagamento.service';
import { PlanoContas } from 'src/app/model/PlanoContas';

@Component({
  selector: 'app-formapagamento-add',
  templateUrl: './formapagamento-add.component.html',
  styleUrls: ['./formapagamento-add.component.css']
})
export class FormapagamentoAddComponent implements OnInit {

  formapagamento = new FormaPagamento();

  planocontas: Array<PlanoContas>;

  constructor(private routeActive: ActivatedRoute, private formaPagamentoService: FormapagamentoService) {

  }

  ngOnInit() {

    this.formaPagamentoService.getPlanoContaList().subscribe(data => {
      this.planocontas = data.content;
    });

    let id = this.routeActive.snapshot.paramMap.get('id');

    if (id != null) {
      this.formaPagamentoService.getFormaPagamento(id).subscribe(data => {
        this.formapagamento = data;
      });
    }
  }

  salvarFormaPagamento() {
    if (this.formapagamento.id != null && this.formapagamento.id.toString().trim() != null) { /* Atualizando ou editando */
      this.formaPagamentoService.updateFormaPagamento(this.formapagamento).subscribe(data => {
        this.novo();
      });
    } else {
      this.formaPagamentoService.salvarFormaPagamento(this.formapagamento).subscribe(data => {
        this.novo();
      });
    }
  }

  novo() {
    this.formapagamento = new FormaPagamento();
  }

}
