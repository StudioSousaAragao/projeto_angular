import { Cliente } from './Cliente';
import { Servico } from './Servico';

export class Agendamento {

    id: number;
    datacadastro: string;
    hora: string;
    observacao: string;
    nome: Cliente = new Cliente();
    servico: Servico = new Servico();
}
