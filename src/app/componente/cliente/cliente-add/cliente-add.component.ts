import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/model/Cliente';
import { TelefoneCliente } from 'src/app/model/TelefoneCliente';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/service/cliente.service';


@Component({
  selector: 'app-cliente-add',
  templateUrl: './cliente-add.component.html',
  styleUrls: ['./cliente-add.component.css']
})
export class ClienteAddComponent implements OnInit {

  cliente = new Cliente();

  telefoneCliente = new TelefoneCliente();

  constructor(private routeActive: ActivatedRoute, private clienteService: ClienteService) { }

  ngOnInit() {
    let id = this.routeActive.snapshot.paramMap.get('id');

    if (id != null) {
      this.clienteService.getClient(id).subscribe(data => {
        this.cliente = data;
      });
    }
  }

  salvarCliente() {
    if (this.cliente.id != null && this.cliente.id.toString().trim() != null) { /* Atualizando ou editando */
      this.clienteService.updateCliente(this.cliente).subscribe(data => {
        this.novo();
      });
    } else {
      this.clienteService.salvarCliente(this.cliente).subscribe(data => {
        this.novo();
      });
    }
  }

  deletarTelefoneCliente(id, i) {
    if (id == null) {
      this.cliente.telefonesCliente.splice(i, 1);
      return;
    }

    if (id !== null && confirm("Deseja Excluir ?")) {
      this.clienteService.removerTelefoneCli(id).subscribe(data => {
        this.cliente.telefonesCliente.splice(i, 1);
      });
    }
  }

  addFoneCli() {
    if (this.cliente.telefonesCliente === undefined) {
      this.cliente.telefonesCliente = new Array<TelefoneCliente>();
    }
    this.cliente.telefonesCliente.push(this.telefoneCliente);
    this.telefoneCliente = new TelefoneCliente();
  }

  novo() {
    this.cliente = new Cliente();
    this.telefoneCliente = new TelefoneCliente();
  }

}
