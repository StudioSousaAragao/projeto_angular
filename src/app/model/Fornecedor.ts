import { TelefoneFornecedor } from './TelefoneFornecedor';

export class Fornecedor {

    id: number;
    nome: string;
    email: string;
    dataCadastro: string;
    telefonesFornecedor: Array<TelefoneFornecedor>;
}
