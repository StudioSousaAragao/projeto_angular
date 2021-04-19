import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) {

  }

  getCategoriaList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlCat);
  }

  getCategoriaPage(pagina): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlCat + 'page/' + pagina);
  }

  getCategoria(id): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlCat + id);
  }

  deletarCategoria(id: number): Observable<any> {
    return this.http.delete(AppConstants.baseUrlCat + id, { responseType: 'text' });
  }

  consultarCategoria(nomecategoria: string): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlCat + 'categoriaPorNome/' + nomecategoria);
  }

  consultaCategoriaPage(nomecategoria: string, page: number): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlCat + 'categoriaPorNomePage/' + nomecategoria + '/page/' + page);
  }

  salvarCategoria(cat): Observable<any> {
    return this.http.post<any>(AppConstants.baseUrlCat, cat);
  }

  updateCategoria(cat): Observable<any> {
    return this.http.put<any>(AppConstants.baseUrlCat, cat);
  }

  downloadPdfRelCat() {
    this.http.get(AppConstants.baseUrlCat + 'relatorioCat', { responseType: 'text' }).subscribe(data => {
      document.querySelector('iframe').src = data;
    });
  }
}
