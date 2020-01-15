import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  private create() {
    return this.db.list('/shopping-carts')
    .push({
      dateCreated: new Date().getTime()
    }).key;
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object("/shopping-carts/" + cartId + "/items/" + productId);
  }

  private async getOrCreateCart() {
    let cartId = localStorage.getItem('cartId'); 
    if(cartId) return cartId;
    
    cartId  = await this.create();
    localStorage.setItem('cartId', cartId);

    return cartId;
  } 

  async addToCart(product) {
    this.updateItemQuanity(product, 1)
  }

  async removeFromCart(product) {
    this.updateItemQuanity(product, -1)
  }

  async clearCart() {
    let cartId = await this.getOrCreateCart();
    return this.db.object("/shopping-carts/" + cartId).remove();
  }

  private async updateItemQuanity(product, change) {
    let cartId = await this.getOrCreateCart();
    let item =  this.getItem(cartId, product.id).valueChanges();
    item.pipe(take(1)).subscribe((existItem: any) => {
    this.db.object("/shopping-carts/" + cartId + "/items/" + product.id).update({
        product: product,
        quantity: existItem ? existItem.quantity + change : 0
      })
    }) 
  }

  async getCart() {
    let cartId = await this.getOrCreateCart();
    return this.db.object("/shopping-carts/" + cartId);
  }


}
