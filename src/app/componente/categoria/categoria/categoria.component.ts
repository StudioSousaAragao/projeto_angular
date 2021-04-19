import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/service/categoria.service';
import { Categoria } from 'src/app/model/Categoria';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categors: Array<Categoria[]>;
  nomecategoria: string;
  p: number;
  total: number;
  pagina: number;

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.categoriaService.getCategoriaList().subscribe(data => {
      this.categors = data.content;
      this.total = data.totalElements;
    });
  }

  deleteCategoria(id: number, index) {

    if (confirm('Deseja Realmente Excluir ?')) {
      this.categoriaService.deletarCategoria(id).subscribe(data => {
        this.categors.splice(index, 1);
      });
    }
  }

  consultaCategoria() {
    if ((this.nomecategoria === '') || (this.nomecategoria === null)) {
      this.categoriaService.getCategoriaList().subscribe(data => {
        this.categors = data.content;
        this.total = data.totalElements;
      });
    } else {
      this.categoriaService.consultarCategoria(this.nomecategoria).subscribe(data => {
        this.categors = data.content;
        this.total = data.totalElements;
        this.nomecategoria = '';
      });
    }
  }

  carregarPaginaCat(pagina) {
    if (this.nomecategoria !== '') {
      this.categoriaService.consultaCategoriaPage(this.nomecategoria, (pagina - 1)).subscribe(data => {
        this.categors = data.content;
        this.total = data.totalElements;
      });
    } else {
      this.categoriaService.getCategoriaPage(pagina - 1).subscribe(data => {
        this.categors = data.content;
        this.total = data.totalElements;
      });
    }
  }

  imprimeRelatorioCat() {
    return this.categoriaService.downloadPdfRelCat();
  }

}
