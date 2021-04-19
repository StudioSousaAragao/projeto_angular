import { PlanoContas } from './PlanoContas';

export class FormaPagamento {

    id: number;
    descricao: string;
    sigla: string;
    datacadastro: Date;
    contaorigem: PlanoContas = new PlanoContas();
    contadestino: PlanoContas = new PlanoContas();
}
