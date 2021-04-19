import { Categoria } from './Categoria';


export class Servico {

    id: number;
    descricao: string;
    duracao: string;
    valor: DoubleRange;
    comissao: DoubleRange;
    categoria: Categoria = new Categoria();
}
