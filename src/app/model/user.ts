import { Telefone } from './telefone';

export class User {

    id: number;
    login: string;
    nome: string;
    email: string;
    senha: string;
    dataCadastro: string;
    //   token: String;
    //   bairro: String;
    //   cep: String;
    //   complemento: String;
    //   localidade: String;
    //   logradouro: String;
    //   uf: String;
    telefones: Array<Telefone>;
}
