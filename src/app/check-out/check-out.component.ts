import { Component, OnInit, OnDestroy } from '@angular/core';
import { CheckoutService } from '../services/checkout.service';
import { FormGroup } from '@angular/forms'; 
import { ShoppingCartService } from '../services/shopping-cart.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  cart;
  cartSubscription; 
  userSubscription;
  userId;

  constructor(
    private checkoutService: CheckoutService,
    private cartService: ShoppingCartService,
    private authService: AuthService,
    private router: Router
  ) { }

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    let user$ = await this.authService.user$;

    this.cartSubscription = cart$.valueChanges().subscribe((cart) => this.cart = cart);
    this.userSubscription = user$.subscribe((user) => this.userId = user.uid);

  }

  async placeOrder(form: FormGroup) {
    let order = {
      userId: this.userId,
      datePlaced: new Date(), 
      items:Object.keys(this.cart.items).map((item: any) => {
        return {
          product: {
            title: this.cart.items[item].product.title,
            imageUrl: this.cart.items[item].product.imageUrl,
            price: this.cart.items[item].product.price
          },
          quantity: this.cart.items[item].quantity,
          totalPrice: this.cart.items[item].quantity * this.cart.items[item].product.price
        }
      }),
      shipping: form.value
    }
    let result =  (await this.checkoutService.storeOrder(order)).key;
    this.cartService.clearCart();
    this.router.navigate(['/order-success', result])
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }


}
