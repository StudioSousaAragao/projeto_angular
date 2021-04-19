import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { Observable } from 'rxjs';
import { ProfReport } from '../model/ProfReport';

@Injectable({
  providedIn: 'root'
})
export class ProfissionalService {

  constructor(private http: HttpClient) { }

  getProfissionalList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlProf);
  }

  getProfissionalListPage(pagina): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlProf + 'page/' + pagina);
  }

  getProfissional(id): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlProf + id);
  }

  deletarProfissional(id: number): Observable<any> {
    return this.http.delete(AppConstants.baseUrlProf + id, { responseType: 'text' });
  }

  consultarProfissional(nome: string): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlProf + 'profissionalPorNome/' + nome);
  }

  consultaProfissionalPage(nome: string, page: number): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlProf + 'profissionalPorNomePage/' + nome + '/page/' + page);
  }

  salvarProfissional(prof): Observable<any> {
    return this.http.post<any>(AppConstants.baseUrlProf, prof);
  }

  updateProfissional(prof): Observable<any> {
    return this.http.put<any>(AppConstants.baseUrlProf, prof);
  }

  removerTelefoneProf(id): Observable<any> {
    return this.http.delete(AppConstants.baseUrlProf + 'removerTelefoneProf/' + id, { responseType: 'text' });
  }

  downloadPdfRelProf() {
    this.http.get(AppConstants.baseUrlProf + 'relatorioProf', { responseType: 'text' }).subscribe(data => {
      document.querySelector('iframe').src = data;
    });
  }

  downloadPdfRelProfParam(profReport: ProfReport) {
    this.http.post(AppConstants.baseUrlProf + 'relatorioProf/', profReport, { responseType: 'text' }).subscribe(data => {
      document.querySelector('iframe').src = data;
    });
  }
}
