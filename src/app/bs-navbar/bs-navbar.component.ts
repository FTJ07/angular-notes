import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  shoppingCartItemCount: number; 

  constructor(
    public auth: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {
  }

  async ngOnInit() {  
    (await this.shoppingCartService.getCart()).valueChanges().subscribe((cart: any) => {
      this.shoppingCartItemCount = 0;
      if(cart) 
      {
        for( let productId in cart.items) {
          this.shoppingCartItemCount +=  cart.items[productId].quantity;
        }
      }
    });
    
  }
  logout() {
    this.auth.logout();
  }

}
