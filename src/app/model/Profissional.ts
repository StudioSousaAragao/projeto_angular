import { TelefoneProfissional } from './TelefoneProfissional';

export class Profissional {

    id: number;
    nome: string;
    email: string;
    datacadastro: string;
    telefonesProfissional: Array<TelefoneProfissional>;
}
