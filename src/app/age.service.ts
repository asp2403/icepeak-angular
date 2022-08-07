import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgeDto } from './dto/age';

@Injectable({
  providedIn: 'root'
})
export class AgeService {

  private url = '/api/ages/'

  constructor(private http: HttpClient) { }

  getAges(): Observable<AgeDto[]> {
    return this.http.get<AgeDto[]>(this.url);
  }
}
