import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { AgeReport } from '../model/AgeReport';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  constructor(private http: HttpClient) { }

  getAgendamentoList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlAge);
  }

  getServicoList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlPath + 'servico/');
  }

  getClienteList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlPath + 'cliente/');
  }

  getAgendamentoListPage(pagina): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlAge + 'page/' + pagina);
  }

  getAgendamento(id): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlAge + id);
  }

  deletarAgendamento(id: number): Observable<any> {
    return this.http.delete(AppConstants.baseUrlAge + id, { responseType: 'text' });
  }

  consultarAgendamento(nome: string): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlAge + 'agendamentoPorNome/' + nome);
  }

  consultaAgendamentoPage(nome: string, page: number): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlAge + 'agendamentoPorNomePage/' + nome + '/page/' + page);
  }

  salvarAgendamento(age): Observable<any> {
    return this.http.post<any>(AppConstants.baseUrlAge, age);
  }

  updateAgendamento(age): Observable<any> {
    return this.http.put<any>(AppConstants.baseUrlAge, age);
  }

  downlaodPdfRelAge() {
    this.http.get(AppConstants.baseUrlAge + 'relatorioAge', { responseType: 'text' }).subscribe(data => {
      document.querySelector('iframe').src = data;
    });
  }

  downloadPdfRelAgeParam(ageReport: AgeReport) {
    this.http.post(AppConstants.baseUrlAge + 'relatorioAge/', ageReport, { responseType: 'text' }).subscribe(data => {
      document.querySelector('iframe').src = data;
    });
  }

  carregarGraficoAge(): Observable<any> {
    return this.http.get(AppConstants.baseUrlAge + 'graficoAgendamento');
  }
}
