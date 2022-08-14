import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ANONYMOUS_USER, LoginDto, UserDetailsDto } from './dto/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "/api/auth/";

  userDetails: UserDetailsDto = ANONYMOUS_USER;
  constructor(
    private http: HttpClient
  ) { }

  login(user: LoginDto): Observable<UserDetailsDto> {
    return this.http.post<UserDetailsDto>(this.url + "login", user);
  }

  logout(): Observable<void> {
    return this.http.post<void>(this.url + 'logout', null);
  }

  hasRole(roleName: string): boolean {
    return this.userDetails.roleName == roleName;
  }

  hasAnyRole(roleNames: string[]): boolean {
    return roleNames.indexOf(this.userDetails.roleName) > -1;
  }

  getAuthToken(): string | null {
    return this.userDetails.authToken;
  }

  getFullName(): string {
    return this.userDetails.name + ' ' + this.userDetails.surname;
  }
}
