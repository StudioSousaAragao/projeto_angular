import { Component, OnInit } from '@angular/core';
import { Profissional } from 'src/app/model/Profissional';
import { TelefoneProfissional } from 'src/app/model/TelefoneProfissional';
import { ActivatedRoute } from '@angular/router';
import { ProfissionalService } from 'src/app/service/profissional.service';

@Component({
  selector: 'app-profissional-add',
  templateUrl: './profissional-add.component.html',
  styleUrls: ['./profissional-add.component.css']
})
export class ProfissionalAddComponent implements OnInit {

  profissional = new Profissional();

  telefoneProfissional = new TelefoneProfissional();

  constructor(private routeActive: ActivatedRoute, private profService: ProfissionalService) { }

  ngOnInit() {

    let id = this.routeActive.snapshot.paramMap.get('id');

    if (id != null) {
      this.profService.getProfissional(id).subscribe(data => {
        this.profissional = data;
      });
    }
  }

  salvarProfissional() {
    if (this.profissional.id != null && this.profissional.id.toString().trim() != null) {
      this.profService.updateProfissional(this.profissional).subscribe(data => {
        this.novo();
      });
    } else {
      this.profService.salvarProfissional(this.profissional).subscribe(data => {
        this.novo();
      });
    }
  }

  deletarTelefoneProfissional(id, i) {
    if (id == null) {
      this.profissional.telefonesProfissional.splice(i, 1);
      return;
    }

    if (id !== null && confirm("Deseja Excluir ?")) {
      this.profService.removerTelefoneProf(id).subscribe(data => {
        this.profissional.telefonesProfissional.splice(i, 1);
      });
    }
  }

  addFoneProf() {
    if (this.profissional.telefonesProfissional === undefined) {
      this.profissional.telefonesProfissional = new Array<TelefoneProfissional>();
    }
    this.profissional.telefonesProfissional.push(this.telefoneProfissional);
    this.telefoneProfissional = new TelefoneProfissional();
  }

  novo() {
    this.profissional = new Profissional();
    this.telefoneProfissional = new TelefoneProfissional();
  }

}
