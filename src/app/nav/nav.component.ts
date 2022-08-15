import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';
import { ANONYMOUS_USER, UserDetailsDto } from '../dto/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
    
    ) {}

  getCartItemCount(): string {
    let count = this.cartService.getCartItemCount();
    if (count > 0) {
      return count.toString();
    } else {
      return '';
    }
  }


  get isAnon() {
    return this.authService.isAnon;
  }

  get isManager() {
    return this.authService.isManager;
  }

  get userDetails(): UserDetailsDto {
    return this.authService.userDetails;
  }

  get fullName(): string {
    return this.authService.getFullName();
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.authService.userDetails = ANONYMOUS_USER;
      this.router.navigate(["/"]);
    });
  }

}
