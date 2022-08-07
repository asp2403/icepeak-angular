import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenderDto } from './dto/gender';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private url = '/api/genders/';

  constructor(private http: HttpClient) { }

  getGenders(): Observable<GenderDto[]> {
    return this.http.get<GenderDto[]>(this.url);
  }
}
