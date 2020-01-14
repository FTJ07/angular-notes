import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { ShoppingCartService } from './services/shopping-cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'oshop';
 

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private shoppingCartService: ShoppingCartService
  ){
    this.authService.user$.subscribe((user) => {
      if(user) {
        this.userService.save(user);
        let returnUrl = localStorage.getItem('returnUrl');
        if(!returnUrl) return;
        
        localStorage.removeItem('returnUrl');
        this.router.navigateByUrl(returnUrl);
      }
    });
  }



}
