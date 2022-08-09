import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ModelFullDto, ModelShortDto } from './dto/model';
import { ModelPriceView } from './dto/model-price-view';
import { ModelSearchDto } from './dto/model-search';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  private url = "/api/models/";

  constructor(private http: HttpClient) { }

  search(params: HttpParams): Observable<ModelSearchDto> {
    return this.http.get<ModelSearchDto>(this.url + "search", {params: params});
  }

  getModel(id: number): Observable<ModelFullDto> {
    return this.http.get<ModelFullDto>(this.url + id);
  }

  getModelsByIds(ids: number[]): Observable<ModelShortDto[]> {
    let params = new HttpParams();
    ids.forEach(item => params = params.append('ids', item));
    return this.http.get<ModelShortDto[]>(this.url + 'list', {params: params});
  }

}
