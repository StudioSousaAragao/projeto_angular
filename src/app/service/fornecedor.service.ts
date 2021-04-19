import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { FornReport } from '../model/FornReport';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  constructor(private http: HttpClient) {

  }

  getFornecedorList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlFor);
  }

  getFornecedorListPage(pagina): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlFor + 'page/' + pagina);
  }

  getFornecedor(id): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlFor + id);
  }

  deletarFornecedor(id: number): Observable<any> {
    return this.http.delete(AppConstants.baseUrlFor + id, { responseType: 'text' });
  }

  consultarFornecedor(nome: string): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlFor + 'fornecedorPorNome/' + nome);
  }

  consultaFornecedorPage(nome: string, page: number): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlFor + 'fornecedorPorNomePage/' + nome + '/page/' + page);
  }

  salvarFornecedor(forn): Observable<any> {
    return this.http.post<any>(AppConstants.baseUrlFor, forn);
  }

  updateFornecedor(forn): Observable<any> {
    return this.http.put<any>(AppConstants.baseUrlFor, forn);
  }

  removerTelefoneFor(id): Observable<any> {
    return this.http.delete(AppConstants.baseUrlFor + 'removerTelefoneFor/' + id, { responseType: 'text' });
  }

  downloadPdfRelFor() {
    this.http.get(AppConstants.baseUrlFor + 'relatorioFor', { responseType: 'text' }).subscribe(data => {
      document.querySelector('iframe').src = data;
    });
  }

  downloadPdfRelForParam(fornReport: FornReport) {
    this.http.post(AppConstants.baseUrlFor + 'relatorioFor/', fornReport, { responseType: 'text' }).subscribe(data => {
      document.querySelector('iframe').src = data;
    });
  }
}
