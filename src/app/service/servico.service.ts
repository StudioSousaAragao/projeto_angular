import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { ServicoReport } from '../model/ServicoReport';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  constructor(private http: HttpClient) { }

  getServicoList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlSer);
  }

  getCategoriaList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlPath + 'categoria/');
  }

  getServicoListPage(pagina): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlSer + 'page/' + pagina);
  }

  getServico(id): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlSer + id);
  }

  deletarServico(id: number): Observable<any> {
    return this.http.delete(AppConstants.baseUrlSer + id, { responseType: 'text' });
  }

  consultarServico(descricao: string): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlSer + 'servicoPorNome/' + descricao);
  }

  consultaServicoPage(descricao: string, page: number): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlSer + 'servicoPorNomePage/' + descricao + '/page/' + page);
  }

  salvarServico(serv): Observable<any> {
    return this.http.post<any>(AppConstants.baseUrlSer, serv);
  }

  updateServico(serv): Observable<any> {
    return this.http.put<any>(AppConstants.baseUrlSer, serv);
  }

  downloadPdfRelServ() {
    this.http.get(AppConstants.baseUrlSer + 'relatorioSer', { responseType: 'text' }).subscribe(data => {
      document.querySelector('iframe').src = data;
    });
  }

  downloadPdfRelServParam(servicoReport: ServicoReport) {
    this.http.post(AppConstants.baseUrlSer + 'relatorioSer/', servicoReport, { responseType: 'text' }).subscribe(data => {
      document.querySelector('iframe').src = data;
    });
  }
}
