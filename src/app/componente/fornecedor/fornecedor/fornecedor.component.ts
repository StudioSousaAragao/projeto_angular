import { Component, OnInit } from '@angular/core';
import { Fornecedor } from 'src/app/model/Fornecedor';
import { FornecedorService } from 'src/app/service/fornecedor.service';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent implements OnInit {

  forns: Array<[Fornecedor]>;
  nome: string;
  p: number;
  total: number;
  pagina: number;

  constructor(private fornService: FornecedorService) {

  }

  ngOnInit() {

    this.fornService.getFornecedorList().subscribe(data => {
      this.forns = data.content;
      this.total = data.totalElements;
    });
  }

  deleteFornecedor(id: number, index) {

    if (confirm('Deseja Realmente Excluir ?')) {
      this.fornService.deletarFornecedor(id).subscribe(data => {
        this.forns.splice(index, 1);
      });
    }
  }

  consultaFornecedor() {
    if (this.nome === '') {
      this.fornService.getFornecedorList().subscribe(data => {
        this.forns = data.content;
        this.total = data.totalElements;
      });
    } else {
      this.fornService.consultarFornecedor(this.nome).subscribe(data => {
        this.forns = data.content;
        this.total = data.totalElements;
        this.nome = '';
      });
    }
  }

  carregarPaginaFor(pagina) {
    if (this.nome !== '') {
      this.fornService.consultaFornecedorPage(this.nome, (pagina - 1)).subscribe(data => {
        this.forns = data.content;
        this.total = data.totalElements;
      });
    } else {
      this.fornService.getFornecedorListPage(pagina - 1).subscribe(data => {
        this.forns = data.content;
        this.total = data.totalElements;
      });
    }
  }

  imprimirRelatorioFor() {
    return this.fornService.downloadPdfRelFor();
  }

}
