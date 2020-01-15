import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartItemCount: number; 
  cart;
  totalPrice = 0;
  constructor(
    private shoppingCartService: ShoppingCartService
  ) { }

  async ngOnInit() {
    (await this.shoppingCartService.getCart()).valueChanges().subscribe((cart: any) => {
      if(cart) {
        this.shoppingCartItemCount = 0;
        this.cart = Object.keys(cart.items).map((i) => cart.items[i]);
        for( let productId in cart.items) {
          this.shoppingCartItemCount +=  cart.items[productId].quantity;
          this.totalPrice = cart.items[productId].quantity * cart.items[productId].product.price;   
        }
      }
    });
  }

  clearCart() {
    this.shoppingCartService.clearCart().then((result) =>{
      this.cart = undefined;
      this.shoppingCartItemCount = 0;
      this.totalPrice = 0;
    })
  }

}
