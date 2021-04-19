import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanocontasService {

  constructor(private http: HttpClient) { }

  getPlanoContasList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlPlanoContas);
  }

  getPlanoContasPage(pagina): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlPlanoContas + 'page/' + pagina);
  }

  getPlanoContas(id): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlPlanoContas + id);
  }

  deletarPlanoContas(id: number): Observable<any> {
    return this.http.delete(AppConstants.baseUrlPlanoContas + id, { responseType: 'text' });
  }

  consultarPlanoContas(descricao: string): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlPlanoContas + 'pctaPorNome/' + descricao);
  }

  consultaPlanoContasPage(descricao: string, page: number): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlPlanoContas + 'pctaPorNomePage/' + descricao + '/page/' + page);
  }

  salvarPlanoContas(pcta): Observable<any> {
    return this.http.post<any>(AppConstants.baseUrlPlanoContas, pcta);
  }

  updatePlanoContas(pcta): Observable<any> {
    return this.http.put<any>(AppConstants.baseUrlPlanoContas, pcta);
  }

  downloadPdfRelPcta() {
    this.http.get(AppConstants.baseUrlPlanoContas + 'relatorioPcta', { responseType: 'text' }).subscribe(data => {
      document.querySelector('iframe').src = data;
    });
  }
}
