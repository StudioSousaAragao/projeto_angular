import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { Observable } from 'rxjs';
import { UserReport } from '../model/UserReport';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {

  }

  getStudentList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl);
  }

  getTelefoneList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlPath + 'telefone/');
  }

  getStudentListPage(pagina): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + 'page/' + pagina);
  }

  getStudant(id): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + id);
  }

  deletarUsuario(id: number): Observable<any> {
    return this.http.delete(AppConstants.baseUrl + id, { responseType: 'text' });
  }

  consultarUser(nome: string): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + 'usuarioPorNome/' + nome);
  }

  consultarUserPorPage(nome: string, page: number): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + 'usuarioPorNomePage/' + nome + '/page/' + page);
  }

  salvarUsuario(user): Observable<any> {
    return this.http.post<any>(AppConstants.baseUrl, user);
  }

  updateUsuario(user): Observable<any> {
    return this.http.put<any>(AppConstants.baseUrl, user);
  }

  removerTelefone(id): Observable<any> {
    return this.http.delete(AppConstants.baseUrl + 'removerTelefone/' + id, { responseType: 'text' });
  }

  userAutenticado() {
    if (localStorage.getItem('token') !== null && localStorage.getItem('token').toString().trim() !== null) {
      return true;
    } else {
      return false;
    }
  }

  downloadPdfRelatorio() {
    this.http.get(AppConstants.baseUrl + 'relatorio', { responseType: 'text' }).subscribe(data => {
      document.querySelector('iframe').src = data;
    });
  }

  downloadPdfRelatorioParam(userreport: UserReport) {
    this.http.post(AppConstants.baseUrl + 'relatorio/', userreport, { responseType: 'text' }).subscribe(data => {
      document.querySelector('iframe').src = data;
    });
  }

  carregarGrafico(): Observable<any> {
    return this.http.get(AppConstants.baseUrl + 'grafico');
  }

}
