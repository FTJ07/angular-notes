import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {
  @Input('product') product: any;
  @Input('show-actions') showActions: any;
  @Input('shopping-cart') shoppingCart: any;

  constructor(
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit() {
  }

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }

  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product);
  }

  getQuanity() {
    if (!this.shoppingCart) return 0;
    let item = this.shoppingCart.items[this.product.id];
    return item ? item.quantity : 0;
  } 

}
