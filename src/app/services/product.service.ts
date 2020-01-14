import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  create(product) {
    let key = this.db.list('/products').push(product).key;
    product.id = key;
    this.update(key, product);
  }

  getAll() {
    return this.db.list('/products').valueChanges();
  }

  getById(productId: string) {
    return this.db.object('/products/'+ productId).valueChanges();
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }

}
