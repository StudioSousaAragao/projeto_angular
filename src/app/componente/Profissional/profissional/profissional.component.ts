import { Component, OnInit } from '@angular/core';
import { Profissional } from 'src/app/model/Profissional';
import { ProfissionalService } from 'src/app/service/profissional.service';

@Component({
  selector: 'app-profissional',
  templateUrl: './profissional.component.html',
  styleUrls: ['./profissional.component.css']
})
export class ProfissionalComponent implements OnInit {

  profs: Array<[Profissional]>;
  nome: string;
  p: number;
  total: number;
  pagina: number;

  constructor(private profService: ProfissionalService) {

  }

  ngOnInit() {
    this.profService.getProfissionalList().subscribe(data => {
      this.profs = data.content;
      this.total = data.totalElements;
    });
  }

  deleteProfissional(id: number, index) {

    if (confirm('Deseja Realmente Excluir ?')) {
      this.profService.deletarProfissional(id).subscribe(data => {
        this.profs.splice(index, 1);
      });
    }
  }

  consultaProfissional() {
    if (this.nome === '') {
      this.profService.getProfissionalList().subscribe(data => {
        this.profs = data.content;
        this.total = data.totalElements;
      });
    } else {
      this.profService.consultarProfissional(this.nome).subscribe(data => {
        this.profs = data.content;
        this.total = data.totalElements;
        this.nome = '';
      });
    }
  }

  carregarPaginaProf(pagina) {
    if (this.nome !== '') {
      this.profService.consultaProfissionalPage(this.nome, (pagina - 1)).subscribe(data => {
        this.profs = data.content;
        this.total = data.totalElements;
      });
    } else {
      this.profService.getProfissionalListPage(pagina - 1).subscribe(data => {
        this.profs = data.content;
        this.total = data.totalElements;
      });
    }
  }

  imprimirRelatorioProf() {
    return this.profService.downloadPdfRelProf();
  }

}