import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModelBasicSearchDto } from './dto/model';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  private url = '/api/public/';

  constructor(
    private http: HttpClient
  ) { }

  searchModelsBasic(params: HttpParams): Observable<ModelBasicSearchDto> {
    return this.http.get<ModelBasicSearchDto>(this.url + 'models-basic/search', {params: params});
  }


}
