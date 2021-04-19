import { TelefoneCliente } from './TelefoneCliente';


export class Cliente {

    id: number;
    nome: string;
    email: string;
    dataCadastro: string;
    //   bairro: String;
    //   cep: String;
    //   complemento: String;
    //   localidade: String;
    //   logradouro: String;
    //   uf: String;
    telefonesCliente: Array<TelefoneCliente>;
}
