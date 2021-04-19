import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class FormapagamentoService {

  constructor(private http: HttpClient) {

  }

  getFormaPagamentoList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlFpa);
  }

  getFormaPagamentoListPage(pagina): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlFpa + 'page/' + pagina);
  }

  getPlanoContaList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlPath + 'planocontas/');
  }

  getFormaPagamento(id): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlFpa + id);
  }

  deletarFormaPagamento(id: number): Observable<any> {
    return this.http.delete(AppConstants.baseUrlFpa + id, { responseType: 'text' });
  }

  consultarFormaPagamento(descricao: string): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlFpa + 'fpaPorNome/' + descricao);
  }

  consultarFormaPagamentoPage(descricao: string, page: number): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlFpa + 'fpaPorNomePage/' + descricao + '/page/' + page);
  }

  salvarFormaPagamento(fpa): Observable<any> {
    return this.http.post<any>(AppConstants.baseUrlFpa, fpa);
  }

  updateFormaPagamento(fpa): Observable<any> {
    return this.http.put<any>(AppConstants.baseUrlFpa, fpa);
  }

  downloadPdfRelFpa() {
    this.http.get(AppConstants.baseUrlFpa + 'relatorioFpa', { responseType: 'text' }).subscribe(data => {
      document.querySelector('iframe').src = data;
    });
  }

}
