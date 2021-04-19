import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { CliReport } from '../model/CliReport';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) {

  }

  getClientList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlCli);
  }

  getClientListPage(pagina): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlCli + 'page/' + pagina);
  }

  getClient(id): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlCli + id);
  }

  deletarCliente(id: number): Observable<any> {
    return this.http.delete(AppConstants.baseUrlCli + id, { responseType: 'text' });
  }

  consultarCliente(nome: string): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlCli + 'clientePorNome/' + nome);
  }

  consultaClientePage(nome: string, page: number): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlCli + 'clientePorNomePage/' + nome + '/page/' + page);
  }

  salvarCliente(cli): Observable<any> {
    return this.http.post<any>(AppConstants.baseUrlCli, cli);
  }

  updateCliente(cli): Observable<any> {
    return this.http.put<any>(AppConstants.baseUrlCli, cli);
  }

  removerTelefoneCli(id): Observable<any> {
    return this.http.delete(AppConstants.baseUrlCli + 'removerTelefoneCli/' + id, { responseType: 'text' });
  }

  downloadPdfRelCli() {
    this.http.get(AppConstants.baseUrlCli + 'relatorioCli', { responseType: 'text' }).subscribe(data => {
      document.querySelector('iframe').src = data;
    });
  }

  downloadPdfRelCliParam(cliReport: CliReport) {
    this.http.post(AppConstants.baseUrlCli + 'relatorioCli/', cliReport, { responseType: 'text' }).subscribe(data => {
      document.querySelector('iframe').src = data;
    });
  }

}
