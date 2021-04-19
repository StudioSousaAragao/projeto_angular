import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/model/Categoria';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from 'src/app/service/categoria.service';

@Component({
  selector: 'app-categoria-add',
  templateUrl: './categoria-add.component.html',
  styleUrls: ['./categoria-add.component.css']
})
export class CategoriaAddComponent implements OnInit {

  categoria = new Categoria();

  constructor(private routeActive: ActivatedRoute, private categoriaService: CategoriaService) {

  }

  ngOnInit() {

    let id = this.routeActive.snapshot.paramMap.get('id');

    if (id != null) {
      this.categoriaService.getCategoria(id).subscribe(data => {
        this.categoria = data;
      });
    }
  }

  salvarCategoria() {
    if (this.categoria.id != null && this.categoria.id.toString().trim() != null) { /* Atualizando ou editando */
      this.categoriaService.updateCategoria(this.categoria).subscribe(data => {
        this.novo();
      });
    } else {
      this.categoriaService.salvarCategoria(this.categoria).subscribe(data => {
        this.novo();
      });
    }
  }

  novo() {
    this.categoria = new Categoria();
  }

}
