import { Component, OnInit } from '@angular/core';
import { Fornecedor } from 'src/app/model/Fornecedor';
import { TelefoneFornecedor } from 'src/app/model/TelefoneFornecedor';
import { ActivatedRoute } from '@angular/router';
import { FornecedorService } from 'src/app/service/fornecedor.service';

@Component({
  selector: 'app-fornecedor-add',
  templateUrl: './fornecedor-add.component.html',
  styleUrls: ['./fornecedor-add.component.css']
})
export class FornecedorAddComponent implements OnInit {

  fornecedor = new Fornecedor();

  telefoneFornecedor = new TelefoneFornecedor();

  constructor(private routeActive: ActivatedRoute, private fornService: FornecedorService) { }

  ngOnInit() {
    let id = this.routeActive.snapshot.paramMap.get('id');

    if (id != null) {
      this.fornService.getFornecedor(id).subscribe(data => {
        this.fornecedor = data;
      });
    }
  }

  salvarFornecedor() {
    if (this.fornecedor.id != null && this.fornecedor.id.toString().trim() != null) {
      this.fornService.updateFornecedor(this.fornecedor).subscribe(data => {
        this.novo();
      });
    } else {
      this.fornService.salvarFornecedor(this.fornecedor).subscribe(data => {
        this.novo();
      });
    }
  }

  deletarTelefoneFornecedor(id, i) {
    if (id == null) {
      this.fornecedor.telefonesFornecedor.splice(i, 1);
      return;
    }

    if (id !== null && confirm('Deseja Excluir ?')) {
      this.fornService.removerTelefoneFor(id).subscribe(data => {
        this.fornecedor.telefonesFornecedor.splice(i, 1);
      });
    }
  }

  addFoneFor() {
    if (this.fornecedor.telefonesFornecedor === undefined) {
       this.fornecedor.telefonesFornecedor = new Array<TelefoneFornecedor>();
    }
    this.fornecedor.telefonesFornecedor.push(this.telefoneFornecedor);
    this.telefoneFornecedor = new TelefoneFornecedor();
  }

  novo() {
    this.fornecedor = new Fornecedor();
    this.telefoneFornecedor = new TelefoneFornecedor();
  }
}
