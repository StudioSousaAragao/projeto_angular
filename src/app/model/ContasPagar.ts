import { PlanoContas } from './PlanoContas';
import { Fornecedor } from './Fornecedor';
import { FormaPagamento } from './FormaPagamento';

export class ContasPagar {

    id: number;
    datacadastro: string;
    datavencimento: string;
    desconto: string;
    valor: string;
    observacao: string;
    parcela: string;
    status: string;
    documento: string;
    notafiscal: string;
    fornecedor: Fornecedor = new Fornecedor();
    contaorigem: PlanoContas = new PlanoContas();
    contadestino: PlanoContas = new PlanoContas();
    fp: FormaPagamento = new FormaPagamento();
}
