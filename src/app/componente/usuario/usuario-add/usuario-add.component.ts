import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Telefone } from 'src/app/model/telefone';

@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  usuario = new User();

  telefone = new Telefone();

  telefones: Array<Telefone>;

  constructor(private routeActive: ActivatedRoute, private userService: UsuarioService) { }

  ngOnInit() {

    this.userService.getStudentList().subscribe(data => {
      this.telefones = data;
    });


    let id = this.routeActive.snapshot.paramMap.get('id');

    if (id != null) {
      this.userService.getStudant(id).subscribe(data => {
        this.usuario = data;
      });
    }

  }

  salvarUser() {
    if (this.usuario.id != null && this.usuario.id.toString().trim() != null) { /* Atualizando ou editando */
      this.userService.updateUsuario(this.usuario).subscribe(data => {
        this.novo();
      });
    } else {
      this.userService.salvarUsuario(this.usuario).subscribe(data => { /* Salvando um novo usu�rio */
        this.novo();
      });
    }

  }

  deletarTelefone(id, i) {

    if (id == null) {
      this.usuario.telefones.splice(i, 1);
      return;
    }

    if (id !== null && confirm('Deseja Excluir ?')) {

      this.userService.removerTelefone(id).subscribe(data => {

        this.usuario.telefones.splice(i, 1);

      });
    }
  }

  addFone() {
    if (this.usuario.telefones === undefined) {
      this.usuario.telefones = new Array<Telefone>();
    }
    this.usuario.telefones.push(this.telefone);
    this.telefone = new Telefone();
  }

  novo() {
    this.usuario = new User();
    this.telefone = new Telefone();
  }

}
