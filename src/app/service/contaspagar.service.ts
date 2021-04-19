import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { CtaReport } from '../model/CtaReport';

@Injectable({
  providedIn: 'root'
})
export class ContaspagarService {

  constructor(private http: HttpClient) { }

  getContasPagarList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlContasPagar);
  }

  getFornecedorList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlPath + 'fornecedor/');
  }

  getPlanoContasList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlPath + 'planocontas/');
  }

  getFormaPagamentoList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlPath + 'formapagamento/');
  }

  getContasPagarListPage(pagina): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlContasPagar + 'page/' + pagina);
  }

  getContasPagar(id): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlContasPagar + id);
  }

  deletarContasPagar(id: number): Observable<any> {
    return this.http.delete(AppConstants.baseUrlContasPagar + id, { responseType: 'text' });
  }

  consultarContasPagar(fornecedor: string): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlContasPagar + 'ctapagPorNome/' + fornecedor);
  }

  consultaContasPagarPage(fornecedor: string, page: number): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlContasPagar + 'ctapagPorNomePage/' + fornecedor + '/page/' + page);
  }

  salvarContasPagar(cta): Observable<any> {
    return this.http.post<any>(AppConstants.baseUrlContasPagar, cta);
  }

  updateContasPagar(cta): Observable<any> {
    return this.http.put<any>(AppConstants.baseUrlContasPagar, cta);
  }

  downlaodPdfRelCta() {
    this.http.get(AppConstants.baseUrlContasPagar + 'relatorioCta', { responseType: 'text' }).subscribe(data => {
      document.querySelector('iframe').src = data;
    });
  }

  downloadPdfRelCtaParam(ctaReport: CtaReport) {
    this.http.post(AppConstants.baseUrlContasPagar + 'relatorioCta/', ctaReport, { responseType: 'text' }).subscribe(data => {
      document.querySelector('iframe').src = data;
    });
  }

  carregarGraficoCta(): Observable<any> {
    return this.http.get(AppConstants.baseUrlContasPagar + 'graficoCtaPagar');
  }
}
