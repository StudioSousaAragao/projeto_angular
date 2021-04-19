export class AppConstants {

    public static get baseServidor(): string { return "http://localhost:8080/" }

    public static get baseLogin(): string { return this.baseServidor + "studiosousaaragao/login" }

    public static get baseUrl(): string { return this.baseServidor + "studiosousaaragao/usuario/" }

    public static get baseUrlCli(): string { return this.baseServidor + "studiosousaaragao/cliente/" }

    public static get baseUrlFor(): string { return this.baseServidor + "studiosousaaragao/fornecedor/" }

    public static get baseUrlSer(): string { return this.baseServidor + "studiosousaaragao/servico/" }

    public static get baseUrlCat(): string { return this.baseServidor + "studiosousaaragao/categoria/" }

    public static get baseUrlProf(): string { return this.baseServidor + "studiosousaaragao/profissional/" }

    public static get baseUrlAge(): string { return this.baseServidor + "studiosousaaragao/agendamento/" }

    public static get baseUrlFpa(): string { return this.baseServidor + "studiosousaaragao/formapagamento/" }

    public static get baseUrlPlanoContas(): string { return this.baseServidor + "studiosousaaragao/planocontas/" }

    public static get baseUrlContasPagar(): string { return this.baseServidor + "studiosousaaragao/contaspagar/" }    

    public static get baseUrlPath(): string { return this.baseServidor + "studiosousaaragao/" }

}
