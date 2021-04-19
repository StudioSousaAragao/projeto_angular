import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/model/Cliente';
import { ClienteService } from 'src/app/service/cliente.service';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clients: Array<Cliente[]>;
  nome: string;
  p: number;
  total: number;
  pagina: number;

  constructor(private clienteService: ClienteService) {

  }

  ngOnInit() {
    this.clienteService.getClientList().subscribe(data => {
      this.clients = data.content;
      this.total = data.totalElements;
    });
  }

  deleteCliente(id: number, index) {

    if (confirm('Deseja Realmente Excluir ?')) {
      this.clienteService.deletarCliente(id).subscribe(data => {
        this.clients.splice(index, 1);
      });
    }
  }

  consultaCliente() {
    if (this.nome === '') {
      this.clienteService.getClientList().subscribe(data => {
        this.clients = data.content;
        this.total = data.totalElements;
      });
    } else {
      this.clienteService.consultarCliente(this.nome).subscribe(data => {
        this.clients = data.content;
        this.total = data.totalElements;
        this.nome = '';
      });
    }
  }

  carregarPaginaCli(pagina) {
    if (this.nome !== '') {
      this.clienteService.consultaClientePage(this.nome, (pagina - 1)).subscribe(data => {
        this.clients = data.content;
        this.total = data.totalElements;
      });
    } else {
      this.clienteService.getClientListPage(pagina - 1).subscribe(data => {
        this.clients = data.content;
        this.total = data.totalElements;
      });
    }
  }

  imprimeRelatorioCli() {
    return this.clienteService.downloadPdfRelCli();
  }

}

